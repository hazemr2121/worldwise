function Message({ message }) {
  return (
    <p className="text-center text-lg w-4/5 my-5 mx-auto font-semibold">
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
