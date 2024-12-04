function getMatchingTailHead(num1, num2) {
  const tail = num1.slice(-2);
  const head = num2.slice(0, 2);
  return tail === head;
}

function findLongestSequence(arr) {
  let maxSequence = '';

  function dfs(currentSequence, remainingFragments) {
    if (remainingFragments.length === 0) {
      if (currentSequence.length > maxSequence.length) {
        maxSequence = currentSequence;
      }
      return;
    }

    for (let i = 0; i < remainingFragments.length; i++) {
      if (getMatchingTailHead(currentSequence, remainingFragments[i])) {
        const nextSequence = currentSequence + remainingFragments[i].slice(2);
        const nextFragments = [...remainingFragments];
        nextFragments.splice(i, 1); 

        dfs(nextSequence, nextFragments);
      }
    }

    if (currentSequence.length > maxSequence.length) {
      maxSequence = currentSequence;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    const startFragment = arr[i];
    const remainingFragments = [...arr];
    remainingFragments.splice(i, 1);

    dfs(startFragment, remainingFragments);
  }

  return maxSequence;
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();
  const text = document.querySelector('#usertext').value;
  const textContainer = document.querySelector('#textContainer');
  if (text) {
    const fragments = text.split(/[\s,]+/).map(num => num.trim());
    if (fragments.length > 1) {
      const largestPuzzle = findLongestSequence(fragments);
      textContainer.textContent = `Найбільша послідовність: ${largestPuzzle}`;
    } else {
      textContainer.textContent = 'Введіть принаймні два числа.';
    }
  } else {
    textContainer.textContent = 'Будь ласка, введіть числа.';
  }
  form.reset();
});

const clearBtn = document.querySelector('.clear-button');
clearBtn.addEventListener('click', function () {
  textContainer.textContent = '';
});
