import { Form } from "@/components/Form";
import { Quote } from "@/components/Quote";

export const Auth = ({ type = "signup" }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center text-center align-center h-screen">
      <Form type={type} />
      <div className="lg:visible invisible">
        <Quote />
      </div>
    </div>
  );
};
