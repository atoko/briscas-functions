import {v4 as uuidv4} from "uuid";
import ProfileData from "../model/ProfileData";

export class ProfileService {
    
    private newProfile(): ProfileData {
        const profileData = new ProfileData();
        profileData.id = uuidv4();
        profileData.created = Date.now().toString();
        return profileData;
    }

    create(): Promise<ProfileData> {
        const profileData = this.newProfile();
        profileData.displayName = (Math.random() * 300).toString();
        profileData.anonymous = true;
        return Promise.resolve(profileData);
    }
}

export default new ProfileService()