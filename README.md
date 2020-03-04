<h1>Time Capsule</h1>

Sick of WebMD telling you you're about to die, when you just have sniffles and a stomachache? Introducing GrampsMD, the folksy, no-frills alternative. Maybe you just need some of great-grandma's spring elixir! Maybe you're just hysterical! Maybe Grandpa doesn't know what you have, but why don't you call him and Grandma more often! Whatever the case may be, Grandpa's advice is sure to beat that of those quack doctors. (Please, please, please do not use GrampsMD for actual medical advice.)

[Link to live app](https://timecapsule.now.sh/)

[Link to backend repo](https://github.com/gusmcnair/TimeCapsuleAPI)

<h2>How it works</h2>
Time Capsule starts on a landing page, which displays an 'enter' button when API call is completed. (In future iterations, there may be a login here as well). Upon clicking and arriving at the main screen, the user has the option of opening any of their capsules. If the capsule has not been opened yet during the current session, it will make an API call to get its information, otherwise it saves the data from the previous load. Capsules which have not yet reached the "open" date are disabled (both on the frontend and backend). Users also have the option to delete capsules, and to add new ones (by clicking the relevant button).


<h2>Images of states</h2>

![Landing page](https://github.com/gusmcnair/TimeCapsuleClient2/blob/master/src/graphics/openpage.png?raw=true)

![Main view](https://github.com/gusmcnair/GrampsMDClient/blob/master/src/graphics/capsulespage.png?raw=true)

![Add capsule view](https://github.com/gusmcnair/GrampsMDClient/blob/master/src/graphics/newcapsulepage.png?raw=true)

<h2>Technologies used</h2>
<ul>
    <li>React.js</li>
    <li>Moment.js</li>
    <li>JSX</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

