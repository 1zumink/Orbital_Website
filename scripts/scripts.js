whereToGoAnim()
parallaxCircles()
formAnim()
animTextLeft()
animTextRight()

function animTextRight() {
  let section = document.querySelector('.rings3D')
  let texts = document.querySelectorAll('.textBigRight')
  let text = document.querySelector('.textParallax ')

  window.addEventListener('scroll', () => {
    let rect = section.getBoundingClientRect()

    let progress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height)

    let p = Math.max(0, Math.min(1, progress))

    let moveX = (p - 0.5) * 10000

    texts.forEach((textBigRight) => {
      textBigRight.style.transform = `translateX(${moveX}px)`
    })
  })
}

function animTextLeft() {
  let section = document.querySelector('.rings3D')
  let texts = document.querySelectorAll('.textBigLeft')
  let text = document.querySelector('.textParallax ')

  window.addEventListener('scroll', () => {
    let rect = section.getBoundingClientRect()

    let progress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height)

    let p = Math.max(0, Math.min(1, progress))

    let moveX = (p - 0.5) * 10000

    texts.forEach((textBigLeft) => {
      textBigLeft.style.transform = `translateX(${-moveX}px)`
    })
  })
}

function formAnim() {
  let button = document.querySelector('.formButton')
  let form = document.querySelector('.form')
  let section = document.querySelector('.formSection')

  let images = [1, 2, 3, 4, 5, 6, 7]
  let randomIndex = Math.floor(images.length * Math.random())

  button.addEventListener('click', () => {
    // form.innerHTML = '<h2>Данные сохранены</h2>'
    form.style.display = 'none'

    section.style.backgroundImage = `url("images/dest${images[randomIndex]}.svg")`
  })
}

function parallaxCircles() {
  let section = document.querySelector('.parallax')
  let circles = document.querySelectorAll('.circle')

  window.addEventListener('scroll', () => {
    let rect = section.getBoundingClientRect()

    let progress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height)

    let p = Math.max(0, Math.min(1, progress))

    let moveY = (p - 0.5) * 7000
    // if (p >= 0.586) {
    //   text.innerText = 'new new new'
    // } else {
    //   text.innerText = 'text text text'
    // }
    circles.forEach((circle) => {
      circle.style.transform = `translateY(${-moveY}px)`
    })
  })
  let text = document.querySelector('.textParallax ')
  let target = document.querySelector('.ballParallaxFull6')

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          text.innerText = 'к звездам!'
        }
      })
    },
    {
      threshold: 1
    }
  )

  observer.observe(target)
}

// function parallax3D() {
//   let section = document.querySelector('.rings3D')
//   let model = document.querySelector('.ringsBlender')

//   window.addEventListener('scroll', () => {
//     let rect = section.getBoundingClientRect()

//     let progress =
//       (window.innerHeight - rect.top) / (window.innerHeight + rect.height)

//     let p = Math.max(0, Math.min(1, progress))

//     let moveY = (p - 0.5) * 100

//     model.style.transform = `translateY(${moveY}px) `
//   })
// }

function whereToGoAnim() {
  let miniCovers = document.querySelectorAll('.miniCover')

  miniCovers.forEach((miniCover) => {
    miniCover.addEventListener('mouseover', () => {
      miniCover.classList.add('anim')
      setTimeout(() => {
        miniCover.classList.toggle('none')
      }, 100)

      let cover = miniCover.previousElementSibling

      cover.classList.toggle('none')
      setTimeout(() => {
        cover.classList.add('anim')
      }, 100)
    })

    miniCover.addEventListener('mouseout', () => {
      miniCover.classList.remove('anim')
      setTimeout(() => {
        miniCover.classList.toggle('none')
      }, 100)

      let cover = miniCover.previousElementSibling

      cover.classList.toggle('none')
      setTimeout(() => {
        cover.classList.remove('anim')
      }, 100)
    })
  })
}

const meteors = document.querySelectorAll('.meteors div')
const container = document.querySelector('.meteors')
const containerRect = container.getBoundingClientRect()

const meteorData = []

meteors.forEach((meteor) => {
  let x = Math.random() * (containerRect.width - meteor.offsetWidth)
  let y = Math.random() * (containerRect.height - meteor.offsetHeight)

  let dx = (Math.random() - 0.5) * 2
  let dy = (Math.random() - 0.5) * 2

  meteor.style.left = x + 'px'
  meteor.style.top = y + 'px'

  meteorData.push({ meteor, x, y, dx, dy, dragging: false })

  let offsetX, offsetY

  meteor.addEventListener('mousedown', (e) => {
    meteorData.find((m) => m.meteor === meteor).dragging = true
    offsetX = e.clientX - meteor.offsetLeft
    offsetY = e.clientY - meteor.offsetTop
    meteor.style.cursor = 'grabbing'
  })

  document.addEventListener('mousemove', (e) => {
    const data = meteorData.find((m) => m.meteor === meteor)
    if (data.dragging) {
      data.x = e.clientX - offsetX
      data.y = e.clientY - offsetY

      data.x = Math.max(
        0,
        Math.min(data.x, containerRect.width - meteor.offsetWidth)
      )
      data.y = Math.max(
        0,
        Math.min(data.y, containerRect.height - meteor.offsetHeight)
      )

      meteor.style.left = data.x + 'px'
      meteor.style.top = data.y + 'px'
    }
  })

  document.addEventListener('mouseup', (e) => {
    const data = meteorData.find((m) => m.meteor === meteor)
    if (data.dragging) {
      data.dragging = false
      meteor.style.cursor = 'grab'

      data.dx = (Math.random() - 0.5) * 2
      data.dy = (Math.random() - 0.5) * 2
    }
  })
})

function meteorss() {
  meteorData.forEach((data) => {
    if (!data.dragging) {
      data.x += data.dx
      data.y += data.dy

      if (
        data.x <= 0 ||
        data.x >= containerRect.width - data.meteor.offsetWidth
      )
        data.dx *= -1
      if (
        data.y <= 0 ||
        data.y >= containerRect.height - data.meteor.offsetHeight
      )
        data.dy *= -1

      data.meteor.style.left = data.x + 'px'
      data.meteor.style.top = data.y + 'px'
    }
  })

  requestAnimationFrame(meteorss)
}
meteorss()
