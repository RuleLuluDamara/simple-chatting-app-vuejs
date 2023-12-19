/* 
 * @param param0 
 * @returns 
 */

export const signIn = async ({email, password}:{email:string, password:string}) => {
    const resp = await fetch("http://localhost:3100/api/accounts/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // console.log(resp);
    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await resp.json();
    return user; 
};

export const signUp = async ({ email, password, username }: { email: string; password: string; username: string }) => {
    const resp = await fetch("http://localhost:3100/api/accounts", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    // console.log(resp);
    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await resp.json();
    return user;
};



