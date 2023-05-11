import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Input from "./Input";
import { ShareOptions } from "./ShareComponent";
import Card from "./Card";
import Button from "./Button";
import MuiLoader from "./MuiLoader";

interface ShareFormProps {
  mode: ShareOptions | undefined;
  photo: string;
  executeAction: any;
  closeModal: () => void;
  loading: boolean;
}

const textContent = {
  linkText: "Already have an account?",
  header: "Share this Image via text",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const emailContent = {
  linkText: "Don't have an account?",
  header: "Welcome To Simple CRUD App",
  subheader: "pre-seeded: user@email.com//password",
  buttonText: "Sign In",
};

const initialForm = { mobile: "", email: "", message: "" };

const defaultTextMsg = "Check out this AI generated image!";

const ShareForm = ({
  mode,
  photo,
  executeAction,
  closeModal,
  loading,
}: ShareFormProps) => {
  const [formState, setFormState] = useState(initialForm);

  const content = mode === ShareOptions.TEXT ? textContent : emailContent;

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (mode === ShareOptions.TEXT) {
        executeAction({
          mobile: formState.mobile,
          message: formState.message ? formState.message : defaultTextMsg,
        });
        console.log("sending text");
      } else {
        console.log("sending email");
      }
    },
    [formState]
  );

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="text-lg text-red">{content.subheader}</p>

          <img
            style={{ width: "25%" }}
            className="mx-auto"
            src={photo}
            alt="a ai generated image"
          />
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === ShareOptions.TEXT ? (
            <div>
              <div>
                <div className="text-lg mb-4 ml-2 text-black/50">
                  Mobile (Include country code):
                </div>
                <Input
                  required
                  placeholder="14169999999"
                  value={formState.mobile}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormState((s) => ({ ...s, mobile: e.target.value }))
                  }
                />
              </div>

              <div>
                <div className="text-lg mb-4 ml-2 text-black/50">
                  Message (Optional)
                </div>
                <Input
                  placeholder="Default: Check this out!!"
                  value={formState.message}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                />
              </div>
            </div>
          ) : (
            <div>email</div>
          )}
          <div className="mt-4">
            <Button type="submit" intent="primary" className="mr-1">
              {loading ? <MuiLoader /> : "Send"}
            </Button>

            <Button onClick={closeModal} intent="secondary" className="ml-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ShareForm;
