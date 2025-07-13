document.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('counter');
  const minusBtn = document.getElementById('minus');
  const plusBtn = document.getElementById('plus');
  const heartBtn = document.getElementById('heart');
  const pauseBtn = document.getElementById('pause');
  const likesList = document.querySelector('.likes');
  const commentForm = document.getElementById('comment-form');
  const commentInput = document.getElementById('comment-input');
  const commentList = document.getElementById('list');

  let count = 0;
  let isPaused = false;
  let intervalId;
  const likes = {}; // Tracks how many times each number was liked

  // Start the counter
  function startTimer() {
    intervalId = setInterval(() => {
      counter.textContent = ++count;
    }, 1000);
  }

  // Stop the counter
  function stopTimer() {
    clearInterval(intervalId);
  }

  startTimer();

  // Increment
  plusBtn.addEventListener('click', () => {
    count++;
    counter.textContent = count;
  });

  // Decrement
  minusBtn.addEventListener('click', () => {
    count--;
    counter.textContent = count;
  });

  // Like a number
  heartBtn.addEventListener('click', () => {
    if (!likes[count]) {
      likes[count] = 1;
      const li = document.createElement('li');
      li.dataset.num = count;
      li.textContent = `${count} has been liked 1 time`;
      likesList.appendChild(li);
    } else {
      likes[count]++;
      const li = likesList.querySelector(`li[data-num="${count}"]`);
      li.textContent = `${count} has been liked ${likes[count]} times`;
    }
  });

  // Pause/resume
  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;

    if (isPaused) {
      stopTimer();
      pauseBtn.textContent = 'resume';
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
    } else {
      startTimer();
      pauseBtn.textContent = 'pause';
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
    }
  });

  // Handle comments
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText !== '') {
      const p = document.createElement('p');
      p.textContent = commentText;
      commentList.appendChild(p);
      commentInput.value = '';
    }
  });
});
