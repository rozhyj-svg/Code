(function(){
  const templates = [
    {
      id: 't1',
      title: 'A day at the zoo',
      text: 'Today I went to the zoo. I saw a {adj} {animal} jumping up and down in its tree. He {verbPast} {adverb} through the large tunnel.'
    },
    {
      id: 't2',
      title: 'Space Adventure',
      text: 'In space, the {noun} was {adj}. The astronaut said, "{exclamation}!" and {verbPast} toward the {place}.'
    },
    {
  id: 't3',
  title: 'Camping Trip',
  text: 'We pitched our {tentAdj} tent beside the {noun}. At midnight the {animal} {verbPast} loudly and we {verbPast2}.'
}
  ];

  const templateSelect = document.getElementById('templateSelect');
  const inputsForm = document.getElementById('inputsForm');
  const generateBtn = document.getElementById('generateBtn');
  const clearBtn = document.getElementById('clearBtn');
  const output = document.getElementById('output');

  function placeholdersFrom(template){
    const set = new Set();
    template.replace(/\{([^}]+)\}/g, (_, key)=> set.add(key));
    return Array.from(set);
  }

  function renderTemplateOptions(){
    templates.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.title;
      templateSelect.appendChild(opt);
    });
    templateSelect.value = templates[0].id;
    renderInputsFor(templates[0]);
  }

  function renderInputsFor(t){
    inputsForm.innerHTML = '';
    const keys = placeholdersFrom(t.text);
    keys.forEach(k => {
      const wrapper = document.createElement('div');
      const label = document.createElement('label');
      label.textContent = k;
      const input = document.createElement('input');
      input.type = 'text';
      input.name = k;
      input.required = true;
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      inputsForm.appendChild(wrapper);
    });
  }

  templateSelect.addEventListener('change', ()=>{
    const t = templates.find(x => x.id === templateSelect.value);
    renderInputsFor(t);
    output.textContent = '';
  });

  generateBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const t = templates.find(x => x.id === templateSelect.value);
    const formData = new FormData(inputsForm);
    const inputs = {};
    for(const [k,v] of formData.entries()) inputs[k] = v.trim();

    // Call server API to generate story
    fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template: t.text, inputs })
    }).then(r => r.json()).then(data => {
      if(data.error) output.textContent = 'Error: ' + data.error;
      else output.textContent = data.story;
    }).catch(err => {
      // fallback to client generator
      try {
        output.textContent = window.madlibGenerator.generate(t.text, inputs);
      } catch (e) {
        output.textContent = 'Error: ' + e.message;
      }
    });
  });

  clearBtn.addEventListener('click', ()=>{
    inputsForm.reset();
    output.textContent = '';
  });

  renderTemplateOptions();
})();
