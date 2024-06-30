import { RegisterForm } from './register-form';

function Register() {
  return (
    <div>
      <h1 className="text-center text-2xl">Register</h1>
      <div className="w-[50vw] mx-auto">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
