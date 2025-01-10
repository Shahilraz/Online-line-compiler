import React, { useEffect, useState } from "react";
import { Container, Button, Switch, Box } from "@mui/material";
import Confetti from "react-confetti"; 

const App = () => {
  const [editorCode, setEditorCode] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const handleCodeChange = (event) => {
    setEditorCode(event.target.value);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handleRun = () => {

    setIsConfettiVisible(true);
    setTimeout(() => setIsConfettiVisible(false), 3000); 
  };

  const formatCode = () => {

    const formattedCode = editorCode.replace(/\s+/g, " ");
    setEditorCode(formattedCode);
  };

  useEffect(() => {
   
    const storedCode = localStorage.getItem("editorCode");
    if (storedCode) {
      setEditorCode(storedCode);
    }
  }, []);

  useEffect(() => {
 
    localStorage.setItem("editorCode", editorCode);
  }, [editorCode]);

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button variant="contained" onClick={handleRun}>
          Run
        </Button>
       
        <label>
          Dark Theme
          <Switch checked={isDarkTheme} onChange={toggleTheme} />
        </label>
      </Box>

      <Box mt={2}>
        <iframe
          src={`https://onecompiler.com/embed/cpp?code=${encodeURIComponent(editorCode)}&theme=${isDarkTheme ? 'dark' : 'light'}`}
          width="100%"
          height="500px"
          title="OneCompiler Editor"
          style={{
            border: "none",
            backgroundColor: isDarkTheme ? "#333" : "#fff",
          }}
        ></iframe>
      </Box>

      {isConfettiVisible && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </Container>
  );
};

export default App;
