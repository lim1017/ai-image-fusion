export default function ChatHelpModalContent() {
  return (
    <div>
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-[42px]">
          Help Guide
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-gray-500 text-[24px]">
            This is a real time chat utilizing websockets, in addition the
            following commands are implemented:
          </p>
        </div>

        <div className="text-left">
          <h4 className="text-lg leading-6 font-medium text-gray-900">
            /image
          </h4>
          <p className="text-sm text-gray-500">
            <strong>Purpose:</strong> Generates an image based on your text
            prompt.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Usage:</strong> Type <code>/image</code> followed by your
            descriptive prompt, and the system will generate a related image.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Example:</strong> <code>/image sunset over the ocean</code>{" "}
            - This command will produce an image depicting a sunset over the
            ocean.
          </p>
        </div>

        <div className="text-left mt-4">
          <h4 className="text-lg leading-6 font-medium text-gray-900">/gpt</h4>
          <p className="text-sm text-gray-500">
            <strong>Purpose:</strong> Engages with a custom-trained chatbot
            designed specifically for this application.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Usage:</strong> Type <code>/gpt</code> followed by your
            question or statement, and the chatbot will respond accordingly.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Example:</strong>{" "}
            <code>/gpt tell me more about the app</code> - The chatbot will
            provide information or respond to queries about the app.
          </p>
        </div>

        <div className="text-left mt-4">
          <h4 className="text-lg leading-6 font-medium text-gray-900">
            /query
          </h4>
          <p className="text-sm text-gray-500">
            <strong>Purpose:</strong> Executes a natural language query on the
            database.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Usage:</strong> Type <code>/query</code> followed by your
            question or request in natural language, and the system will
            translate it into a database query and return the results.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Example:</strong>{" "}
            <code>/query how many users are registered</code> - The system will
            respond with the number of users in the database.
          </p>
        </div>
      </div>
    </div>
  );
}
