import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "@/app/globals.css";
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import Nav from '../components/Nav';
import router from 'next/router';

const stripePromise = loadStripe('pk_test_51Ov5JFCajx6ndCSaytP6bepcFS61iiQtQ2LBSVGtamItSx53fra9lZXzc78DXnpxPVtjCqrpqW31f5ptOiqnwaQ800E3xbyWK2');
// Define a type for the user profile
interface UserProfile {
  picture: string;
  id_hash: string;
  stripe_customer_id: string;
  email: string;
  credits: number;
  is_member: boolean;
  
  // Add other user profile fields as needed
}
const CheckoutPage = () => {

  
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
      const savedProfile = Cookies.get('userProfile');
      if (savedProfile) {
          setProfile(JSON.parse(savedProfile) as UserProfile);
      }
  }, []);

  const handleCheckout = async () => {
    console.log(profile?.email);
    console.log(profile?.id_hash);
    axios.get(`https://upgrade.fineasapp.io:2096/get-user-info?id_hash=${profile?.id_hash}`).then((res) => {
      console.log(res.data['user'])
    })

    try {
      const response = await axios.post('https://upgrade.fineasapp.io:2096/upgrade_membership', {
        id_hash: profile?.id_hash,
      });

      const sessionId = response.data.checkout_session_id;
      console.log(sessionId);
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.error('Failed to start the checkout process:', error);
      alert('Failed to start the checkout process. Please try again.');
    }
  };

  const handleCancellation = async () => {
    try {
      const response = await axios.post('https://upgrade.fineasapp.io:2096/cancel-subscription', {
        stripe_customer_id: 'cus_PpPiiNPYmdvbBB',
      });
      //redirect to the analysis page
      console.log(response);
      if (response.data.success === true) {
        alert('Subscription cancelled successfully!');
        router.push('/');
      } else {
        alert('Failed to cancel subscription. Please try again.');
      }

    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    }
  };

  return (
    <>
      <Nav variant="" onChatSelect={function (chatName: string): void {
        throw new Error('Function not implemented.');
      } } chatNames={[]} saveChat={function (): void {
        throw new Error('Function not implemented.');
      } } loadChat={function (name: string): void {
        throw new Error('Function not implemented.');
      } } chatName={''} setChatName={function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="flex flex-col items-center justify-center h-screen bg-main-color">
        {/* Assuming you have defined custom colors in your tailwind.config.js */}
        <Button 
          onClick={handleCheckout} 
          className="bg-alternate-color text-white py-5 text-3xl border-none cursor-pointer my-5 h-auto w-3/5 max-w-lg"
        >
          Go To Checkout!
        </Button>
          <p onClick={handleCancellation} className="cursor-pointer text-xs text-left text-white">
            Cancel subscriptions
          </p>
      </div>
    </>
  );
};

export default CheckoutPage;
