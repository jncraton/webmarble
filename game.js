const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter

const engine = Engine.create()
const world = engine.world

// Expose for testing
window.game = { engine, world, Composite }

const render = Render.create({
  element: document.getElementById('game-container'),
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: '#f0f0f0',
  },
})

Render.run(render)
const runner = Runner.create()
Runner.run(runner, engine)

const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, {
  isStatic: true,
})
Composite.add(world, ground)

let currentTool = 'marble'

const tools = document.querySelectorAll('.tool')
tools.forEach(tool => {
  tool.addEventListener('click', () => {
    tools.forEach(t => t.classList.remove('active'))
    tool.classList.add('active')
    currentTool = tool.getAttribute('data-tool')
  })
})

document.querySelector('[data-tool="marble"]').classList.add('active')

document.getElementById('clear').addEventListener('click', () => {
  const allBodies = Composite.allBodies(world)
  allBodies.forEach(body => {
    if (!body.isStatic) {
      Composite.remove(world, body)
    } else if (body !== ground) {
      Composite.remove(world, body)
    }
  })
})

const mouse = Mouse.create(render.canvas)
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
})

Composite.add(world, mouseConstraint)

let startPoint = null

render.canvas.addEventListener('mousedown', event => {
  if (mouseConstraint.body) return

  const position = { ...mouse.position }

  if (currentTool === 'marble') {
    const marble = Bodies.circle(position.x, position.y, 10, {
      restitution: 0.6,
      friction: 0.001,
      render: { fillStyle: '#e74c3c' },
    })
    Composite.add(world, marble)
  } else if (currentTool === 'line') {
    startPoint = position
  }
})

render.canvas.addEventListener('mouseup', event => {
  if (currentTool === 'line' && startPoint) {
    const endPoint = mouse.position
    const dx = endPoint.x - startPoint.x
    const dy = endPoint.y - startPoint.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)

    if (distance > 5) {
      const line = Bodies.rectangle(startPoint.x + dx / 2, startPoint.y + dy / 2, distance, 5, {
        isStatic: true,
        angle: angle,
        render: { fillStyle: '#34495e' },
      })
      Composite.add(world, line)
    }
    startPoint = null
  }
})

window.addEventListener('resize', () => {
  render.canvas.width = window.innerWidth
  render.canvas.height = window.innerHeight
  Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 25 })
})
