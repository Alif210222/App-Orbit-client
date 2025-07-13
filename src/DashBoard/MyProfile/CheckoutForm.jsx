import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CheckoutForm = ({ price, user, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { amount: price }).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);



  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    // create payment intent 
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName || 'anonymous',
          email: user.email,
        },
      },
    });

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
        console.log("payment hoice aiber bari ja ",paymentIntent)
      // Update membership status in DB
      await axiosSecure.patch(`/user/membership-status/${user.email}`, {
        membership_status: 'verified',
      });

      toast.success('Payment successful! Membership verified.');
      closeModal();
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:opacity-55"
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
