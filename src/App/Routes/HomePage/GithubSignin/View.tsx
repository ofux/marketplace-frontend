import cn from "classnames";
import { FC } from "react";
import GitHubLogin from "react-github-login";

import config from "src/config";
import GithubIcon from "src/icons/Github";
import Modal from "./Modal";
import Loader from "src/icons/Loader";

type Props = {
  isSuccess: boolean;
  isLoading: boolean;
  displayError: boolean;
  className?: string;
  onSuccess: ({ code }: { code: string }) => Promise<void>;
  onFailure: (error: Error) => void;
  onClose: () => void;
  error?: Error;
};

const GithubSignin: FC<Props> = ({
  isLoading,
  isSuccess,
  displayError,
  className,
  onClose,
  onFailure,
  onSuccess,
  error,
}) => {
  if (isSuccess) {
    return (
      <div className="flex flex-col justify-center items-center text-4xl text-center text-green-500 mt-12">
        Your Github account has been linked to your NFT profile
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-4xl text-center text-blue-500 mt-12">
        <Loader className="animate-spin mr-4 mb-4" size={62} />
        <div>We are verifying your information before minting your NFT profile</div>
      </div>
    );
  }

  return (
    <GitHubLogin
      redirectUri={`${config.GITHUB_REDIRECT_URI}?action=login%26provider=github`}
      clientId={config.GITHUB_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={cn(
        className,
        "flex flex-row bg-black px-8 py-4 rounded-md text-xl shadow-white/20 shadow-md hover:bg-neutral-900"
      )}
    >
      <GithubIcon className="fill-white" />
      <div className="ml-4 font-bold">Sign In With Github</div>
      {renderError()}
    </GitHubLogin>
  );

  function renderError() {
    if (error) {
      return (
        <Modal isOpen={displayError} onClose={onClose}>
          <div className="text-2xl text-red-300">
            An error occurred while trying to verify your request and minting your NFT.
            <br />
            <p className="text-xl mt-2">Please try again or contact us if the problem still occurred.</p>
          </div>
        </Modal>
      );
    }
  }
};

export default GithubSignin;