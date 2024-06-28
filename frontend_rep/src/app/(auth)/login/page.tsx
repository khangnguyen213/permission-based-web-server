import { LoginForm } from './login-form';

function Login() {
  return (
    <div>
      <h1 className="text-center text-2xl">Login</h1>
      <div className="w-[50vw] mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
