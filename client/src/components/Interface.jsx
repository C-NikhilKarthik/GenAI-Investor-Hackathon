import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
// import useClipboard from "react-use-clipboard";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";

const Section = (props) => {

  const { children } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection />
      <InputBoard />
    </div>
  );
};

const AboutSection = () => {
  const [data, setData] = useState({
    name: "",
    profileImage: "",
  });

  const getData = useCallback(() => {
    const token = localStorage.getItem("token"); // Replace 'token' with your actual key

    axios
      .get("http://localhost:5000/user/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
        },
      })
      .then((response) => {
        console.log(response);
        const { name, profileImage } = response.data;
        setData({
          name: name,
          profileImage: profileImage,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(
            "Server responded with an error status:",
            error.response.status
          );
          console.log("Response data:", error.response.data);
        }
      });
  }, []);

  useEffect(() => {
    getData();
  }, []);



  return (
    <Section>
      <div className="w-fit p-4 bg-[#cacbfe]/20 backdrop-blur rounded-lg">
        <h1 className="text-6xl font-extrabold leading-snug">
          Welcome Back
          <br />
          <span className="px-1 italic">{data.name}</span>
        </h1>
        <motion.p
          className="text-lg text-[#22222c] mt-4"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
        >
          Clarify Your Doubts
          <br />
          Your AI Companion for Exploring and Learning
        </motion.p>
        <motion.button
          className={`bg-violet-500 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-16`}
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 2,
          }}
        >
          Contact me
        </motion.button>
      </div>
    </Section>
  );
};

const InputBoard = () => {
  // const [textToCopy, setTextToCopy] = useState();
  // const [isCopied, setCopied] = useClipboard(textToCopy, {
  //     successDuration:1000
  // });

  // const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  // const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //     return null
  // }

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <motion.div className="h-full w-full p-4 md:p-20" whileInView={"visible"}>
        <div className="h-full rounded bg-[#686882]/70 shadow-lg mr-44 backdrop-blur flex flex-col overflow-hidden">
          <div className="w-full p-3 px-4 relative flex justify-between bg-slate-900">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EC6A5F]"></div>
              <div className="ml-1.5 w-2.5 h-2.5 rounded-full bg-[#F4BF50]"></div>
              <div className="ml-1.5 w-2.5 h-2.5 rounded-full bg-[#61C454]"></div>
              <svg width="24" height="24" fill="none" className="ml-4 flex-none text-slate-400 dark:text-slate-500"><path d="m15 7-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              <svg width="24" height="24" fill="none" className="ml-2 flex-none text-slate-400 dark:text-slate-500"><path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <div>
              <svg width="24" height="24" fill="none" className="text-slate-400 dark:text-slate-500">
                <path d="M12.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM12.5 12a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM18.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM18.5 12a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM6.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM6.5 12a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM12.5 18a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM18.5 18a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM6.5 18a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>

            <div className="absolute left-1/2 top-2 -translate-x-1/2">
              <div><div className="bg-slate-100 rounded-md font-medium text-xs leading-6 py-1 flex items-center justify-center ring-1 ring-inset ring-slate-900/5 mx-auto px-10 dark:bg-slate-800 dark:text-slate-500"><svg viewBox="0 0 20 20" fill="currentColor" className="text-slate-300 w-3.5 h-3.5 mr-1.5 dark:text-slate-500"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>NRAM.ai</div></div>
            </div>
          </div>
          <div>
          {/* <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

                </div>

            </div> */}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

