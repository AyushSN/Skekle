// const count=0;

// function counter(api){
//     var startTime;
//     if(api.req){
//         count++;
//         if(count==1){
//             startTime=Date.now();
//         }
//     }
//     wait till api response
//     {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;

//         if(elapsedTime >= 60000){
//             count=0;
//         }

//         if(count==5 ){
//             setTimeout(elapsedTime);
//             count=0;
//         }
//     }
// }


















//     currentTime = Date.now();
    //     elapsedTime = currentTime - startTime;

    //     if(elapsedTime >= 6000){
    //         counter=0;
    //     }

    //     if(counter==5 && timer<=60000){
    //         setTimeout(elapsedTime);
    //     }

    // }
    // console.log("Array called " + count)



// // Start the timer
// const startTime = Date.now();
// console.log('Timer started.');

// // Function to check elapsed time
// const checkElapsedTime = () => {
//     const currentTime = Date.now();
//   const elapsedTime = currentTime - startTime; // Time in milliseconds
//   const elapsedSeconds = Math.floor(elapsedTime / 1000); // Convert to seconds
//     console.log(`Elapsed time: ${elapsedSeconds} seconds`);
// };

// // Example usage: Check elapsed time after a delay
// setTimeout(() => {
//     checkElapsedTime();
// }, 5000); // Check elapsed time after 5 seconds