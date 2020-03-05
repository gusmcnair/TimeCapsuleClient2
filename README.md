<h1>Time Capsule</h1>

Time Capsule is an app for sending messages that can be accessed only by your future self, whether tomorrow, a month from now, or in five years. Use it to send reminders, pass encouragement to a future version of you, or just document what your life is like right now.
 

[Link to live app](https://timecapsule.now.sh/)

[Link to backend repo](https://github.com/gusmcnair/TimeCapsuleAPI)

<h2>How it works</h2>
Time Capsule starts on a landing page, which displays an 'enter' button when API call is completed. (In future iterations, there may be a login here as well). Upon clicking and arriving at the main screen, the user has the option of opening any of their capsules. If the capsule has not been opened yet during the current session, it will make an API call to get its information, otherwise it saves the data from the previous load. Capsules which have not yet reached the "open" date are disabled (both on the frontend and backend). Users also have the option to delete capsules, and to add new ones (by clicking the relevant button).


<h2>Images of states</h2>

![Landing page](https://github.com/gusmcnair/TimeCapsuleClient2/blob/master/src/graphics/openpage.png?raw=true)

![Main view](https://github.com/gusmcnair/TimeCapsuleClient2/blob/master/src/graphics/capsulespage.png?raw=true)

![Add capsule view](https://github.com/gusmcnair/TimeCapsuleClient2/blob/master/src/graphics/newcapsulepage.png?raw=true)

<h2>Technologies used</h2>
<ul>
    <li>React.js</li>
    <li>Moment.js</li>
    <li>JSX</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

