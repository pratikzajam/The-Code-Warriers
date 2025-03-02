import {FaStar, FaFire, FaGem } from 'react-icons/fa';

const Pricing = () => {
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const plans = [
    {
      title: "Free",
      price: 0,
      features: [
        "Basic asana tracking",
        "Join community groups",
        "Basic progress stats",
        "Limited challenges",
        "Ads supported"
      ],
      popular: false
    },
    {
      title: "Basic",
      price: 299,
      features: [
        "Everything in Free",
        "Advanced analytics",
        "Custom challenges",
        "Ad-free experience",
        "Email support"
      ],
      popular: false
    },
    {
      title: "Premium",
      price: 599,
      features: [
        "Everything in Basic",
        "Personalized yoga plans",
        "Video tutorials",
        "Priority support",
        "Offline access"
      ],
      popular: true
    },
    {
      title: "Pro",
      price: 999,
      features: [
        "Everything in Premium",
        "1-on-1 coaching",
        "Diet plans",
        "24/7 support",
        "Exclusive content"
      ],
      popular: false
    }
  ];

  const handlePayment = (plan) => {
    console.log('Starting payment process for plan:', plan);
    
    if (!window.Razorpay) {
      console.error('Razorpay SDK not found');
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    // Use the correct environment variable format for Vite
    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET;
    
    console.log('Razorpay key:', RAZORPAY_KEY_ID); // Check if key is accessible

    const options = {
      key: 'rzp_test_tzYfBPKGbrzTPi', // Directly use your test key for now
      amount: plan.price * 100,
      currency: "INR",
      name: "Yoga Wellness Pro",
      description: `${plan.title} Plan Subscription`,
      handler: function(response) {
        alert(`Thanks for payment! Now you're a ${plan.title} member.`);
        console.log('Payment success:', response);
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#4F46E5"
      }
    };

    try {
      console.log('Initializing Razorpay with options:', options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay initialization failed:', error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Start your yoga journey with flexible pricing options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm font-semibold rounded-bl-xl rounded-tr-xl flex items-center">
                  <FaStar className="mr-2" /> Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.title}
                </h3>
                <p className="text-4xl font-bold text-purple-600">
                  ₹{plan.price === 0 ? '0' : plan.price.toLocaleString('en-IN')}
                  <span className="text-lg text-gray-500">/month</span>
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li 
                    key={fIndex}
                    className="flex items-center text-gray-600 text-sm"
                  >
                    {feature.includes("Everything") ? (
                      <FaFire className="w-4 h-4 text-orange-500 mr-2" />
                    ) : feature.includes("support") ? (
                      <FaGem className="w-4 h-4 text-blue-500 mr-2" />
                    ) : (
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                }`}
              >
                {plan.price === 0 ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;