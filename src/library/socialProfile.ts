import * as Octokit from '@octokit/rest';

interface Profile {
  email: string;
  displayName: string;
  profileUrl: string;
}

export enum PROFILE_GETTER_TYPE {
  github = 'github',
  google = 'google',
  facebook = 'facebook'
}

type ProfileGettersType = {
  [key in PROFILE_GETTER_TYPE]: (accessToken: string) => Promise<Profile | null>
};

const profileGetters: ProfileGettersType = {
  [PROFILE_GETTER_TYPE.github]: async (
    accessToken: string
  ): Promise<Profile | null> => {
    try {
      const octokit = new Octokit({
        auth: `token ${accessToken}`
      });

      const response = await octokit.users.getAuthenticated();

      const {
        email,
        avatar_url: profileUrl,
        name: displayName
      } = response.data;

      return {
        email,
        profileUrl,
        displayName
      };
    } catch (error) {
      console.error('error:', error.message);
      return null;
    }
  },
  [PROFILE_GETTER_TYPE.google]: async () => {
    return {} as Profile;
  },
  [PROFILE_GETTER_TYPE.facebook]: async () => {
    return {} as Profile;
  }
};

const getSocialProfile = async (
  profileGetterType: PROFILE_GETTER_TYPE,
  accessToken: string
) => profileGetters[profileGetterType](accessToken);

export default getSocialProfile;
