const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image"); // Assuming option_images contains multiple img elements

// Loop through each option image
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    // Add the "active" class to the clicked image
    image.classList.add("active");

    // Remove "active" class from other images
    optionImages.forEach((image2, index2) => {
      if (index !== index2) {
        image2.classList.remove("active");
      }
    });

    // Add "start" class to the game container
    gameContainer.classList.add("start");

    // Set a timeout for the animation and game result logic
    setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      const imageSrc = e.target.tagName === "IMG" ? e.target.src : e.target.querySelector("img").src;
      userResult.src = imageSrc;

      // Generate a random choice for the CPU
      const randomNumber = Math.floor(Math.random() * 3);
      const cpuImages = ["asset/image/rock.png", "asset/image/paper.png", "asset/image/scissors.png"];
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      const cpuValue = ["R", "P", "S"][randomNumber];

      // Assign a letter value to the clicked option (based on index)
      const userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      const outcomes = {
        RR: "Draw",
        RP: "CPU",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "CPU",
        SS: "Draw",
        SP: "User",
        SR: "CPU",
      };

      // Look up the outcome value based on the user and CPU option
      const outcomeValue = outcomes[userValue + cpuValue];

      // Update the result text
      result.textContent = outcomeValue === "Draw" ? "Match Draw!" : `${outcomeValue} Won!!`;

      console.log(outcomeValue);
    }, 2500); // Timeout duration
  });
});
