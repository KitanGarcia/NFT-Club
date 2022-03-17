import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useUser } from '../hooks/userUser';

const Home: NextPage = () => {
  const router = useRouter();
  const connectedWallet = useAnchorWallet();
  const { user } = useUser();

  const handleBecomeCreator = useCallback(() => {
    router.push('/sign-up');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mb-16 flex flex-col items-center">
        <div className="flex">
          <div className="prose flex flex-1 items-center justify-center">
            <h1 className="text-center">
              Welcome
              <br />
              to{' '}
              <span className="text-primary">
                NFT
                <br />
                Club
              </span>
            </h1>
          </div>
          <div className="prose flex flex-1 items-center justify-center">
            <p className="p-8 text-center">
              Here's a big mass of text. Cool... Here's a big mass of text.
              Cool...Here's a big mass of text. Cool...Here's a big mass of
              text. Cool...Here's a big mass of text. Cool... Here's a big mass
              of text.
              <br />
              <br />
              We're gonna talk about how sick our product is. And you're all
              gonna love it.
            </p>
          </div>
        </div>
        {!connectedWallet ? (
          <WalletMultiButton className="btn btn-primary" />
        ) : user.creatorAccount ? (
          <button
            className="btn btn-primary"
            onClick={() => router.push('/creator-hub')}
          >
            Visit Creator Hub
          </button>
        ) : (
          <div>
            <button className="btn btn-primary" onClick={handleBecomeCreator}>
              Become a Creator
            </button>
            <br />
            <button
              className="btn btn-primary"
              onClick={() => {
                user.subscriptions.length
                  ? router.push('/subscription-hub')
                  : router.push('/creator-landing-page');
              }}
            >
              {user.subscriptions.length
                ? 'See my subsriptions'
                : 'Subscribe to a creator'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
