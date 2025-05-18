export interface User {
    id: string;
    //user_name: string;
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    //password: string;
    address: string;
}