/* Update this file when the photographer approves her final images and package details.
   Keep isPlaceholder:true until an image is approved for the final showcase.
   Null package values display honest "coming soon" messages, never invented prices.
   Image paths are relative to index.html; use local files in assets/photos/. */
window.MAJOR_K_CONTENT = {
  photos: {
    heroLeft: {src:"assets/photos/major-k-couple-sunset.webp",alt:"Preview placeholder: a couple sharing a quiet moment near cattle at sunset",position:"38% 50%",isPlaceholder:true},
    heroCenter: {src:"assets/photos/major-k-couple-country.webp",alt:"Preview placeholder: a smiling couple embracing outdoors in the country",position:"50% 42%",isPlaceholder:true},
    heroRight: {src:"assets/photos/wedding-details.webp",alt:"Preview placeholder: a wedding table with white flowers and glassware",position:"50% 70%",isPlaceholder:true},
    showcaseOne: {src:"assets/photos/major-k-family-moment.webp",alt:"Preview placeholder: a black-and-white candid photograph of three women",position:"42% 42%",isPlaceholder:true},
    showcaseTwo: {src:"assets/photos/major-k-wedding-ceremony.webp",alt:"Preview placeholder: an outdoor wedding ceremony beneath a wooden pavilion",position:"50% 55%",isPlaceholder:true}
  },
  showcase: [
    {photo:"showcaseOne",title:"The people who matter",subtitle:"Preview image — final showcase coming soon"},
    {photo:"showcaseTwo",title:"The moments between",subtitle:"Preview image — final showcase coming soon"}
  ],
  collections: [
    {name:"Weddings",isPlaceholder:true,description:"Example shoot type only. Wedding coverage, timing, deliverables, and availability will be filled in after Major K Media confirms the package.",packageName:"Package name placeholder",price:"Price placeholder",coverage:"Coverage placeholder",included:"Deliverables placeholder"},
    {name:"Engagements & couples",isPlaceholder:true,description:"Example shoot type only. Session length, locations, outfit changes, and finished gallery details are still to be confirmed.",packageName:"Package name placeholder",price:"Price placeholder",coverage:"Session length placeholder",included:"Deliverables placeholder"},
    {name:"Families",isPlaceholder:true,description:"Example shoot type only. Family session options and group-size details will be added when the final packages are ready.",packageName:"Package name placeholder",price:"Price placeholder",coverage:"Session length placeholder",included:"Deliverables placeholder"},
    {name:"Seniors & graduates",isPlaceholder:true,description:"Example shoot type only. Final senior and graduation session options, locations, and image counts will be added here.",packageName:"Package name placeholder",price:"Price placeholder",coverage:"Session length placeholder",included:"Deliverables placeholder"},
    {name:"Events",isPlaceholder:true,description:"Example shoot type only. Event coverage options and hourly details will be added after Major K Media confirms this offering.",packageName:"Package name placeholder",price:"Price placeholder",coverage:"Coverage placeholder",included:"Deliverables placeholder"}
  ]
};
