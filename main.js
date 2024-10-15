const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const habitList = document.getElementById('habit-list');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
  habitList.innerHTML = '';
  habits.forEach((habit, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${habit.name}</span>
      <div>
        <button onclick="toggleHabit(${index})">${habit.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn" onclick="deleteHabit(${index})">Delete</button>
      </div>
    `;
    if (habit.completed) {
      li.style.textDecoration = 'line-through';
    }
    habitList.appendChild(li);
  });
}

habitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const habitName = habitInput.value.trim();
  if (habitName) {
    habits.push({ name: habitName, completed: false });
    saveHabits();
    renderHabits();
    habitInput.value = '';
  }
});

window.toggleHabit = (index) => {
  habits[index].completed = !habits[index].completed;
  saveHabits();
  renderHabits();
};

window.deleteHabit = (index) => {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
};

renderHabits();