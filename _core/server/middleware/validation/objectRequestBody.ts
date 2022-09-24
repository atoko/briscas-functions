import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ClassType } from 'class-transformer/ClassTransformer';
import BadRequestException from '$server/exceptions/BadRequestException';
export default async function validateObjectRequestBody<T>(klass: ClassType<T>, body: Object) {
    if (Array.isArray(body)) {
        throw new BadRequestException();
    }
    const request = plainToClass(klass, body) as T;

    return validateOrReject(request, {
        whitelist: true,
        forbidNonWhitelisted: true
    })
        .then(() => request)
        .catch((validations) => {
            throw new BadRequestException(validations);
        });
}
