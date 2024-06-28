import { RegisterForm } from './register-form';

function Register() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <div>
      <h1 className="text-center text-2xl">Register</h1>
      {process.env.NEXT_PUBLIC_API_URL}
      <div className="w-[50vw] mx-auto">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
