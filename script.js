const form = document.getElementById('dynamicForm');

function addElement(type) {
  let element, label;
  const container = document.createElement('div');
  container.className = 'form-element';
  switch (type) {
    case 'input':
      label = createEditableLabel('Input');
      element = document.createElement('input');
      element.placeholder = 'Placeholder..';
      break;
    case 'textarea':
      label = createEditableLabel('Textarea');
      element = document.createElement('textarea');
      element.placeholder = 'Placeholder..';
      break;
    case 'select':
      label = createEditableLabel('Select');
      element = createSelect();
      break;
  }

  const deleteBtn = document.createElement('i');
  deleteBtn.classList.add('fa', 'fa-trash-o');
  deleteBtn.style.fontSize = '16px';
  deleteBtn.style.color = 'black';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.onclick = function() { container.remove(); };

  const elementContainer = document.createElement('div');
  elementContainer.appendChild(element);

  container.appendChild(label);
  container.appendChild(element);
  container.appendChild(deleteBtn);
  form.appendChild(container);

  function createLabel(text, placeholder) {
    const label = document.createElement('label');
    label.textContent = `${text}: `;
    return label;
  }
}

function createSelect() {
  const select = document.createElement('select');
  ['Sample option 1', 'Sample option 2', 'Sample option 3'].forEach(optText => {
    const option = document.createElement('option');
    option.textContent = optText;
    select.appendChild(option);
  });
  return select;
}

function createEditableLabel(text) {
  const label = document.createElement('span');
  label.textContent = text;
  label.contentEditable = true;
  label.onblur = function() {
    label.style.backgroundColor = ''; 
  };
  return label;
}


function logJSON() {
  const formElements = form.querySelectorAll('.form-element');
  const jsonData = Array.from(formElements).map(el => {
    const label = el.querySelector('span[contenteditable="true"]').textContent;
    const input = el.querySelector('input, textarea, select');
    let details = {
      label: label,
      type: input.tagName.toLowerCase()
    };

    if (input.tagName.toLowerCase() === 'select') {
      details.options = Array.from(input.options).map(option => option.text);
    } else {
      details.placeholder = input.value; 
    }

    return details;
  });

  console.log(JSON.stringify(jsonData, null, 2)); 
}

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-btn';
  saveButton.onclick = logJSON;
  document.body.appendChild(saveButton);
});


