export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="py-3 px-3 bg-green-600 rounded-md text-white hover:bg-green-700"
    >
      {children}
    </button>
  );
}
