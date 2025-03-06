// Step 1: Set up a more organic shape for feedback
shape(9,.3,.4).out(o0)

render()

// Step 2: Create a dynamic modulated noise texture
voronoi(10,0.2).modulate(noise(3,0.1)).posterize(5).out(o1)

// Step 3: Introduce a warped grid using repeat and scroll
var n = 6
a = () => shape(6, .3).rotate(Math.random()*100,Math.random()*3-1.75).repeat(n,n)
a().add(a().scrollX(()=>.5/n).scrollY(()=>.5/n)).out(o2)

// Step 4: Feed o2 back into itself with modulation and blend it with o0
src(o2).modulate(src(o1)).blend(o0,.05).out(o2)

// Step 5: Add a second feedback loop with rotation and kaleid
src(o2)
  .modulate(src(o1).rotate(.5,0.5))
  .kaleid(9)
  .posterize(50)
  .blend(osc(3,.6,9), 0.3) // Correct way to integrate osc()
  .out(o3)

// Render the final output
render(o3)
