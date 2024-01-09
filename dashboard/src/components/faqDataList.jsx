const faqData = [
  {
    question: "What is our gym's membership policy?",
    answer:
      "Our membership options vary, offering both short-term and long-term plans. Contact our customer support in the gym, and we'll be happy to help you.",
  },
  {
    question: "How do I sign up for a gym membership?",
    answer:
      "You can easily sign up for a membership on our website by visiting the Membership page. Follow the instructions provided to complete the process.",
  },
  {
    question: "Can I bring a guest to the gym?",
    answer: "Yes, we offer guest passes.",
  },
  {
    question: "What are the gym's operating hours?",
    answer: "Our gym is open seven days a week.",
  },
  {
    question: "How can I reset my password for the online portal?",
    answer:
      "If you forget your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email to reset your password.",
  },
  {
    question: "What fitness classes do you offer?",
    answer:
      "Our gym provides a variety of fitness classes. Check the My Schedule page for a list of current classes and their timings.",
  },
  {
    question: "Can I freeze or cancel my membership?",
    answer:
      "Yes, you can freeze or cancel your membership. Contact our customer support in the gym, and we'll be happy to help you.",
  },
  {
    question: "Do you have personal trainers available?",
    answer: "Yes, we offer personal training services.",
  },
  {
    question: "What safety measures are in place at the gym?",
    answer:
      "At our gym, your safety is our top priority. We've implemented key safety measures, including hand sanitization stations, social distancing protocols, mask requirements, and health screenings. Online reservations help manage capacity, and our staff is trained to enforce safety guidelines. With optimized ventilation, contactless transactions, and a strict cleaning schedule, we create a secure environment. We educate members through signage and designate an isolation area for those feeling unwell. Our emergency response plan ensures a swift and effective reaction to any situation, emphasizing a gym experience focused on health and well-being.",
  },
  {
    question: "How do I provide feedback or suggestions?",
    answer:
      "We welcome your feedback. Contact our customer support in the gym, and we'll be happy to hear from you.",
  },
];

// Automatically add numbers to questions
faqData.forEach((item, index) => {
  item.number = index + 1;
});

export default faqData;
