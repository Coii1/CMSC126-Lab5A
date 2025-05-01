async function loadHeroes() {
    try{
      response = await fetch("https://api.opendota.com/api/heroStats")

      if(!response.ok){
        throw new Error("Failed to fetch")
      }

      const data = await response.json();
      console.log(data)
      const container = document.getElementById('heroes');
      container.innerHTML = ''; // clear loading text

      data.forEach(hero => {
        const heroDiv = document.createElement('div');
        heroDiv.className = 'hero';
        
        const name = document.createElement('div');
        name.textContent = hero.localized_name;
        
        const img = document.createElement('img');
        img.src = `http://cdn.dota2.com${hero.img}`;
        img.alt = hero.localized_name;

        const roles = document.createElement('ul')
        roles.id = "heroRole"
        hero.roles.forEach(role => {
          //roleList = document.getElementById("heroRole");
          const roleItem = document.createElement('li');
          roleItem.textContent = role;
          roles.appendChild(roleItem);
        })

        heroDiv.appendChild(name);
        heroDiv.appendChild(img);
        heroDiv.appendChild(roles);
        heroDiv.appendChild(document.createElement("br"))
        heroDiv.appendChild(document.createElement("br"))
        container.appendChild(heroDiv);
      })

    } catch(error){
      console.error('Error fetching hero data:',error)
      document.getElementById('heroes').textContent = 'Failed to load heroes.';
    }
  }

  // Load heroes after load sng page
  loadHeroes();