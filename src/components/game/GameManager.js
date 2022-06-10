export const getGames = () => {
  return fetch("http://localhost:8000/games", {
      headers:{
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
  })
      .then(response => response.json())
}

export const createGame = (newGame) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(newGame)
    })
        .then(response => response.json())
  }

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
  }