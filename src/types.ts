interface IBlog {
    id: number;
    ordered: number; // 设置博客的优先级可用
    name: string;
    title: string;
    content: string;
    tags: string[];
}

interface IUserInfo {
    avatarUrl: string;
    name: string;
    sex: string;
    address: string;
    birthday: string;
    aboutMe: string;
}

interface ITalk {
    id: number;
    userInfo: IUserInfo;
    content: string;
    releaseTime: number;
    mood: string;
}

export {
    IBlog,
    IUserInfo,
    ITalk
}
