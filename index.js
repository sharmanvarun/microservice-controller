//funcation number 0 that calls all the other microservies
const axios = require('axios');

async function invokeMicroservices() {
  try {
    // Call the 1st microservice
    const response1 = await axios.post('http://localhost:3000/transcribe', {
      audioContent: 'hi show me sports news in base 64',
    });
    const message1 = response1.data.message;
    console.log('Response from speech-to-text microservice: ', message1);

    // Call the 2nd microservice
    const response2 = await axios.post('http://localhost:4002/chat', {
      message: message1,
    });
    const message2 = response2.data.message;
    console.log('Response from NLP microservice:', message2);

    // Call the 3rd microservice
    const response3 = await axios.get(`http://localhost:4005/news/${message2}`);
    const newsArray = response3.data;
    console.log('Response from 3rd microservice which gets data from LaRepublica:', newsArray);

    // Extract the content from the 1st news object in the array
    const content = newsArray[0].content;

    // Call the 4th microservice
    const response4 = await axios.post('http://localhost:4001/synthesize', {
      text: content,
    });
    console.log('Response from text-to-speech microservice is commented out since it is an audio and it fills the entire terminal:',);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

invokeMicroservices();
