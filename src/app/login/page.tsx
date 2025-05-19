import LoginForm from '@/forms/login-form';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="tp-main-wrapper h-screen">
      <div className="container mx-auto my-auto h-full flex items-center justify-center">
        <div className="pt-[120px] pb-[120px]">
          <div className="shadow-lg bg-white overflow-hidden rounded-md max-w-[500px] mx-auto">
            <div className="px-5 md:px-[60px] pt-[50px] py-[60px]">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <Image 
                    src="/assets/img/logo/onewoodlogo.jpg"
                    alt="OneWood Logo"
                    width={300}
                    height={100}
                    priority
                    className="max-w-full h-auto"
                  />
                </div>
                <h4 className="text-[24px] mb-1">Admin Login</h4>
                <p>Don&apos;t have an account?  
                 <span> 
                    <Link href="/register" className="text-theme">Sign Up</Link> 
                  </span>
                </p>
              </div>
              <div className="">
                <LoginForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
