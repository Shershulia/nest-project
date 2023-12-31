import React from 'react';
import {FrontendLayout, LoginForm} from "@/components";

const LoginPage = () => {
    return (
        <FrontendLayout>
            <div className={"w-full "}>
                <LoginForm/>
            </div>
        </FrontendLayout>
    );
};

export default LoginPage;