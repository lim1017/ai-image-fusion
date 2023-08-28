const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">About</h1>
        <p className="mt-2 text-[#666e75] text-[14px]">
          MERN stack app with Vite, Tailwind, & Typescript. Utilizing openAI's
          GPT-3, Whisper, & Dall-e to create some fun content.
        </p>
        <h3 className="mt-3">
          Extended from JavaScript Mastery tutorial:{" "}
          <a
            className="text-[#148cf5] text-[16px]"
            href="https://www.youtube.com/watch?v=EyIvuigqDoA"
            target="_blank"
          >
            Link
          </a>
        </h3>
      </div>
      <div className="mt-4">
        <ul className="ul-about" style={{ listStyleType: "disc", padding: 20 }}>
          <li className="mt-4 li-about">OpenAI API</li>
          <li className="mt-4 li-about">Twilio API</li>
          <li className="mt-4 li-about">Upload/Storage/Serving Images</li>
          <li className="mt-4 li-about">Audio recording/upload</li>
          <li className="mt-4 li-about">Pagination</li>
          <li className="mt-4 li-about">Prompt Engineering</li>
          <li className="mt-4 li-about">React Query</li>
          <li className="mt-4 li-about">CSS Animations</li>
          <li className="mt-4 li-about">Responsive Design</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
