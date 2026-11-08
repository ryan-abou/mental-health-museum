/* All museum text lives here so the group can edit it without touching the layout code.
   To add the finished PSA, paste its YouTube link into PSA_VIDEO_URL below
   (e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"). */
window.PSA_VIDEO_URL = "";

window.MUSEUM = {
  title: "Turning Outward",
  subtitle: "A museum of the right to mental health",
  course: "AP Lang and Comp · Dr. Gingrich · Fall 2026",

  rooms: [
    /* ---------------------------------------------------------------- LOBBY */
    {
      id: "lobby",
      short: "Lobby",
      name: "The Lobby",
      curator: "the whole team",
      wall: "#dfe8e3",
      ink: "#173a40",
      accent: "#2f6f6a",
      intro: [
        "Welcome. This museum argues that mental health care is a human right, and that students like you deserve to get it without shame, without a long wait, and without needing money to do it.",
        "The lobby connects to every gallery. Five rooms look at where mental health struggles show up in a teenager's life: stigma, social media, work, school, and the novel <cite>Turtles All the Way Down</cite> by John Green. Take the guided tour, or open the floor plan and wander."
      ],
      facts: [
        { label: "The human right", text: "The right to mental health. Article 25 of the Universal Declaration of Human Rights says everyone has the right to a standard of living adequate for their health and well-being, including medical care." },
        { label: "The global goal", text: "UN Sustainable Development Goal 3, Good Health and Well-Being. Target 3.4 calls on countries to promote mental health and well-being by 2030." },
        { label: "Why now", text: "Many students live with heavy academic pressure, anxiety, and worry about the future. Stigma and a lack of resources keep a lot of them from asking for help." },
        { label: "Who it's for", text: "Middle and high school students, especially anyone feeling the weight of AP classes, college pressure, or a hard semester." },
        { label: "What we're asking", text: "Learn the signs of a mental health struggle, push back on stigma, and use the resources around you when you need support." },
        { label: "Getting in", text: "The museum is online and free. It works on a phone, a Chromebook, or a library computer, so any student can visit, anywhere, any time." }
      ],
      pov: "The student we interviewed needs mental health support that is easy to reach, because school stress, AP classes, and pressure about the future can affect her performance, her relationships, and her overall well-being.",
      hmw: "How might we design a museum that helps students like her learn about mental health resources and feel comfortable asking for help when they are overwhelmed?",
      voices: [
        { q: "What does mental well-being mean to you?", a: "Honestly, just feeling okay in your own head. Like you can have a bad day and not spiral about it." },
        { q: "Does mental health get enough attention in schools?", a: "Nah, not really. [My school] puts up some posters and calls it a day." },
        { q: "How does it affect daily life?", a: "When I'm in a good place, a bad grade is like, okay, whatever, I'll fix it. When I'm not, it feels like the end of the world." },
        { q: "What helps most when you're overwhelmed?", a: "Someone just listening without trying to fix it right away." },
        { q: "Should access to care be a human right?", a: "Yeah. Whether you can get help shouldn't depend on how much money your family has." },
        { q: "What gets in the way?", a: "Money is the biggest one. Waitlists are super long too. And for teens, you usually need a parent to approve it or drive you." },
        { q: "What could schools do better?", a: "Hire more counselors, and ones who actually have time for students. And just make it normal to ask for help." }
      ],
      tour: "Welcome to Turning Outward, a museum of the right to mental health. Before you start, look at the screen on the left. It plays our public service announcement. To your right is a wall of notes from a real high school student we interviewed. Her answers shaped every room you're about to see. When you're ready, head through the first doorway, into the gallery on mental health stigma."
    },

    /* ------------------------------------------------------------- ROOM 1 */
    {
      id: "stigma",
      number: 1,
      short: "Stigma",
      name: "Mental Health Stigma",
      curator: "Hanrui Huang",
      wall: "#e9e1ec",
      ink: "#3b2541",
      accent: "#7a4f86",
      intro: [
        "Stigma is the belief that struggling with your mental health makes you weak, dramatic, or broken. It rarely shows up as cruelty. Usually it shows up as silence: the joke nobody laughs at, the topic that gets changed, the friend who says \"I'm fine\" because that is easier than the truth.",
        "This gallery is about what stigma does. It makes people hide, and hiding keeps them from help."
      ],
      artifacts: [
        {
          art: "crowd",
          title: "The One in Color",
          medium: "Painted figures on a gallery wall",
          label: "A gray crowd stands together. One figure, in color, stands apart. Stigma makes a person who is struggling feel visible and alone at the same time, as if everyone else is fine and only they are not.",
          closer: "Look again: the crowd isn't gray at all. In the CDC's 2023 survey, 40% of U.S. high school students reported persistent feelings of sadness or hopelessness. The person in color was never the only one.",
          book: {
            quote: "I was somebody's something.",
            cite: "Green 2",
            note: "Aza describes herself as a sidekick, defined by the people around her. She keeps her own inner life out of view. That is what stigma asks of people: stay in your role and don't let anyone see the spiral."
          }
        },
        {
          art: "mask",
          title: "The \"I'm Fine\" Mask",
          medium: "Cracked porcelain, hand-lettered",
          label: "The surface of this mask is covered in the things we say when someone asks how we are: I'm fine. Just tired. It's whatever. Each phrase is small, but together they hold the mask in place.",
          closer: "Through the cracks you can read what the mask is hiding. The cracks aren't damage. They're where the truth starts to get out, and where someone else can finally see in.",
          book: {
            quote: "Maybe I'm just a lie that I'm whispering to myself.",
            cite: "Green 105",
            note: "Aza often hides how bad her spirals are, even from her mom, Daisy, and Davis. She also doubts her treatment, because she worries that if her medication changes her thoughts, it changes who she is. The mask is the face she shows. This line is what's underneath."
          }
        }
      ],
      connect: "Stigma is one of the biggest barriers between students and care. A 2026 study of more than 2,000 Asian American and Latinx students in grades 4 to 12 found that high stigma kept youth with anxiety and depression symptoms from seeking help (Yu et al.). SDG Target 3.4 can't be met if students are too ashamed to ask.",
      tour: "This is the gallery on mental health stigma, curated by Hanrui Huang. On the first wall, a gray crowd and one figure in color: stigma makes struggling feel lonely. Press Look closer, and watch the crowd change. Next to it is the I'm fine mask, covered in the phrases we hide behind. Through its cracks, you can read what's really going on. In Turtles All the Way Down, Aza hides her spirals from almost everyone, and wonders if she's just a lie she's whispering to herself. Continue to the next gallery: social media."
    },

    /* ------------------------------------------------------------- ROOM 2 */
    {
      id: "social",
      number: 2,
      short: "Social media",
      name: "Mental Health on Social Media",
      curator: "Ryan Abourjeili",
      wall: "#dbe9f0",
      ink: "#123344",
      accent: "#23779a",
      intro: [
        "Your phone is the first thing you see in the morning and the last thing at night. It connects you to friends, but it also hands you an endless feed of other people's best moments and, at 2 a.m., an answer to every fear you type into it.",
        "This gallery looks at two screens: the one in your hand, and the one that shows you yourself."
      ],
      artifacts: [
        {
          art: "phone",
          title: "A Teenager's Phone",
          medium: "Smartphone, screen time report, search history",
          label: "On the home screen: a feed of perfect vacations, perfect grades, perfect friend groups. Screen time this week: 7 hours 42 minutes a day. Every post is someone's highlight reel, and it's easy to compare it to your whole life.",
          closer: "Swipe over to the search history, timestamped 2:14 a.m. These are the questions people ask a search bar because they don't feel they can ask a person. The internet always answers, but it can't tell when you need someone to talk to.",
          book: {
            quote: "True terror isn't being scared; it's not having a choice in the matter.",
            cite: "Green 22",
            note: "Early in the novel, Aza becomes convinced she has a dangerous bacterial infection, C. diff, and reads about it online again and again. Each search pulls her further into the spiral. Her phone doesn't calm the fear. It feeds it."
          }
        },
        {
          art: "mirror",
          title: "The Idealized Mirror",
          medium: "Gilded frame, filtered glass",
          label: "This mirror shows you as the internet wants you to look: smoothed skin, perfect lighting, sparkles. It's the reflection a beauty filter gives you, and after enough time with it, your real face can start to feel like a mistake.",
          closer: "Turn the filter off. The real reflection has no sparkles and no glow, and it is the only one that is actually you. The goal isn't to look like the filter. The goal is to stop measuring yourself against it.",
          book: {
            quote: "I was a story riddled with plot holes.",
            cite: "Green 253",
            note: "Aza sees herself as unfinished and full of gaps. Social media shows everyone else as a finished, polished story. The mirror's filter hides the plot holes, but everyone has them. Aza's healing starts when she accepts hers instead of trying to edit them out."
          }
        }
      ],
      connect: "Our interviewee named \"everybody comparing themselves to everyone else online\" as a top source of teen stress. Promoting mental well-being (SDG Target 3.4) has to include the digital world where students now spend much of their day: knowing when to log off, and knowing that a search bar isn't a substitute for a counselor.",
      tour: "Welcome to the social media gallery, curated by Ryan Abourjeili. First, a teenager's phone. Its feed is full of highlight reels, and its search history, at 2:14 in the morning, is full of questions people are afraid to ask out loud. In the novel, Aza looks up her fear of infection online, over and over, and every search makes it worse. Next, the idealized mirror. Press Look closer to turn the filter off. Aza calls herself a story riddled with plot holes. Everyone has them; filters just hide them. Continue to the next gallery: mental health at work."
    },

    /* ------------------------------------------------------------- ROOM 3 */
    {
      id: "work",
      number: 3,
      short: "Work",
      name: "Mental Health in the Workplace",
      curator: "Nithil Arun",
      wall: "#f1e7d0",
      ink: "#3d2c0c",
      accent: "#9a6a12",
      intro: [
        "Many teenagers already have a job, and almost all of them have a workload: shifts, practices, clubs, homework, and the long list of things that are supposed to get you into college. When every hour is spoken for, rest starts to feel like something you have to earn.",
        "This gallery is about time: how much of it pressure takes, and how much of it we're allowed to keep."
      ],
      artifacts: [
        {
          art: "clock",
          title: "The Balance Clock",
          medium: "Clock face, divided into a day",
          label: "A healthy day, drawn as a clock: time for sleep, for school or work, for friends and family, and for breaks that are actually breaks. Each part of the day holds up the others.",
          closer: "This is what the same clock looks like during a crunch. Work and homework swallow the breaks, then the time with friends, then the sleep. Nothing about the day looks dramatic, but there's no room left in it to recover.",
          book: {
            quote: "I was so good at being a kid, and so terrible at being whatever I was now.",
            cite: "Green 25",
            note: "Aza feels the gap between childhood and the responsibilities that come with growing up. Daisy feels it even more: she works shifts at Chuck E. Cheese and worries constantly about money for college. That pressure is part of why she wants the $100,000 reward for finding Davis's missing father so badly."
          }
        },
        {
          art: "poster",
          title: "The Break Room Poster",
          medium: "Printed poster, tear-off tabs",
          label: "A poster for the break room wall: \"It's okay to clock out.\" It reminds workers, and students, that stepping away isn't laziness. Rest is part of doing good work.",
          closer: "Tear a tab. Each one has something you can actually use: a number to call, a person to talk to, a first step. A poster alone isn't support, as our interviewee pointed out. A poster that points to real help is a start.",
          book: {
            quote: "Life is a series of choices between wonders.",
            cite: "Green 188",
            note: "Davis writes this on his blog. The poster makes a similar case: taking a break is a choice, too, and choosing rest, friends, or something you love is not falling behind."
          }
        }
      ],
      connect: "When we asked a student what would help, she said: less crazy workloads. Real support for mental health (SDG Target 3.4) means workplaces and schools that build breaks into the day, not just posters that mention them.",
      tour: "This is the workplace gallery, curated by Nithil Arun. The Balance Clock shows a healthy day: sleep, work, friends, and breaks. Press Look closer to see what happens in a crunch week, when work slowly eats everything else. In the novel, Daisy works shifts at Chuck E. Cheese and worries about paying for college, and Aza feels she was good at being a kid, but terrible at whatever she is now. On the next wall is a break room poster. It's okay to clock out. Its tear-off tabs point to real help. Continue to the school gallery."
    },

    /* ------------------------------------------------------------- ROOM 4 */
    {
      id: "school",
      number: 4,
      short: "School",
      name: "Mental Health at School",
      curator: "Jewel McCallum",
      wall: "#dfe8dd",
      ink: "#18321f",
      accent: "#3f6e4b",
      intro: [
        "School is where students spend most of their waking hours, so it's where mental health struggles are most often seen, and most often missed. Bullying follows students home on their phones. A crowded cafeteria can be the loneliest room in the building.",
        "It's also where help is closest: a counselor down the hall, a teacher who notices, a seat saved at lunch."
      ],
      artifacts: [
        {
          art: "chat",
          title: "The Phone Under the Desk",
          medium: "Group chat, screenshots",
          label: "A group chat during third period. The messages are short and the jokes are quick, but they land on one person. Cyberbullying doesn't end when the bell rings. It comes home, into the bedroom, and stays on the screen all night.",
          closer: "Here's what to do instead of scrolling past: take a screenshot, block the account, report it, and tell an adult you trust. If it's happening to a friend, reach out to them privately. One message can change how that night goes.",
          book: {
            quote: null,
            cite: "Green, key scene",
            note: "In one of the novel's most painful scenes, Aza reads Daisy's Star Wars fan fiction online and recognizes herself in a character Daisy portrays as needy and exhausting to be around. Daisy didn't mean it as bullying, but words posted online can hurt someone in ways the writer never sees. The two friends only repair things once they talk face to face."
          }
        },
        {
          art: "table",
          title: "The Lunch Table for One",
          medium: "Cafeteria table, one tray",
          label: "A long cafeteria table with one student and one tray. Every other seat is empty. For a student without a friend group, lunch can be the hardest 30 minutes of the day.",
          closer: "Look closer and the seats fill in. It only takes one person to sit down. The CDC calls feeling connected to school one of the most important protective factors for youth mental health.",
          book: {
            quote: "Our lunch table was like a long-running play on Broadway",
            cite: "Green 2",
            note: "Aza has a seat at a lunch table, but she feels cast in a role there instead of known. You can be surrounded by people and still feel alone. The goal is a table where you can be yourself, not just a seat."
          }
        }
      ],
      connect: "Schools are where SDG Target 3.4 is won or lost for teenagers. The CDC recommends that schools link students to mental health services, train staff, and build safe and supportive environments, so that the counselor's office is a place students actually go.",
      tour: "This is the school gallery, curated by Jewel McCallum. First, the phone under the desk, and a group chat that follows a student home. Press Look closer to see what you can do: screenshot, block, report, and tell someone. In the novel, Aza is hurt by fan fiction Daisy posts online, and they only heal by talking face to face. Next, the lunch table for one. Look closer, and the seats fill in. Aza calls her lunch table a long-running play on Broadway: a place where everyone has a role. Continue to the final gallery, the book room."
    },

    /* ------------------------------------------------------------- ROOM 5 */
    {
      id: "book",
      number: 5,
      short: "The book",
      name: "Turtles All the Way Down",
      curator: "the whole team",
      wall: "#1d2747",
      ink: "#eef0f8",
      accent: "#e7c46a",
      dark: true,
      intro: [
        "John Green's 2017 novel follows Aza Holmes, a sixteen-year-old in Indianapolis who lives with anxiety and obsessive-compulsive disorder. Green has said the book grew out of his own experience with OCD.",
        "Aza has a therapist, Dr. Karen Singh, and a mother who loves her. Many teens don't have either. That's why this book belongs in a museum about rights: it shows what care looks like, and how much it matters, even when it doesn't fix everything at once."
      ],
      artifacts: [
        {
          art: "spiral",
          title: "The Spiral",
          medium: "Wire sculpture",
          label: "Aza's most important image for her own mind is a spiral: a thought that circles tighter and tighter until there's no room left for anything else. Follow this sculpture inward and you never reach the end.",
          closer: "But a spiral runs in both directions. Follow it outward, and it widens: a friend, a parent, a therapist, writing things down. This is where the museum gets its name, Turning Outward.",
          book: {
            quote: "The thing about a spiral is, if you follow it inward, it never actually ends.",
            cite: "Green 7",
            note: "Aza's thought spirals drive the whole novel. The line explains why she can't simply \"stop thinking about it.\" The spiral isn't a choice, and that's why mental illness needs treatment, not willpower."
          }
        },
        {
          art: "turtles",
          title: "The Tower of Turtles",
          medium: "Carved turtles, stacked",
          label: "The novel's title comes from an old story. A scientist says the Earth floats in space; a woman replies that the world rests on the back of a giant turtle. What holds up the turtle? \"It's turtles all the way down.\"",
          closer: "Aza keeps searching for the bottom turtle: the one final answer that will make her fears stop. Daisy tells her that's not how it works. Late in the novel (around p. 245) the two friends read the story differently. You don't have to find the bottom to keep standing.",
          book: {
            quote: "Your now is not your forever.",
            cite: "Green 93",
            note: "Aza's mother tells her this, and Aza holds onto it. It is the novel's most hopeful line: the spiral feels permanent from the inside, but it isn't."
          }
        }
      ],
      connect: "The novel ties every gallery together. It shows stigma (Aza hiding her spirals), the internet feeding fear, money pressure on Daisy, and friendships strained by things left unsaid. It also shows what the right to mental health looks like when it's honored: a teenager with steady access to a therapist and people who keep showing up for her.",
      tour: "Welcome to the book room, dedicated to Turtles All the Way Down by John Green. First, the spiral. Aza says that if you follow a spiral inward, it never actually ends. Press Look closer, and the spiral turns outward, toward the people and tools that help. Next, the tower of turtles, from the old story that gives the book its title. Aza is always looking for the bottom turtle, the final answer. You don't need to find it to keep going. As Aza's mother tells her, your now is not your forever. Continue to the exit, where you'll find the resources this museum is all about."
    },

    /* --------------------------------------------------------------- EXIT */
    {
      id: "exit",
      short: "Exit",
      name: "Before You Go",
      curator: "the whole team",
      wall: "#dfe8e3",
      ink: "#173a40",
      accent: "#2f6f6a",
      intro: [
        "You've walked the spiral inward. This is the way out, and it's the most important room in the museum."
      ],
      signs: [
        "Sleeping much more or much less than usual",
        "Pulling away from friends, family, or things they used to love",
        "Snapping at people, or being irritable most of the time",
        "Grades or work slipping, or procrastinating in a loop",
        "Talking about feeling hopeless, worthless, or like a burden",
        "Treating one bad grade or one bad day like the end of the world"
      ],
      help: [
        "Listen first. Our interviewee said the most helpful thing is \"someone just listening without trying to fix it right away.\"",
        "Ask directly how they're doing, and wait for a real answer.",
        "Help them find the next step: a counselor, a parent, a doctor.",
        "If they might be in danger, tell a trusted adult right away, even if they asked you not to."
      ],
      resources: [
        { name: "988 Suicide & Crisis Lifeline", how: "Call or text 988, any time, free", url: "https://988lifeline.org" },
        { name: "Crisis Text Line", how: "Text HOME to 741741", url: "https://www.crisistextline.org" },
        { name: "Your school counselor", how: "Ask the front office, or email them to set up a time", url: null },
        { name: "A trusted adult", how: "A parent, coach, teacher, or doctor you feel safe with", url: null }
      ],
      tour: "This is the exit, and the most important room in the museum. Here you'll find the signs that someone may be struggling, how to help a friend, and where to get support. If you or someone you know is in crisis, call or text 988, any time. Thank you for visiting Turning Outward. Remember: your now is not your forever."
    }
  ],

  psaScript: [
    { cue: "Sound: a phone buzzing, over and over. Visual: a dark bedroom, a phone lighting up." },
    { line: "It's 2 a.m. You have three tests this week, a group chat that won't stop, and a voice in your head saying you're already behind." },
    { cue: "Pause." },
    { line: "If that sounds familiar, you're not the only one. In 2023, four in ten high school students said they felt persistently sad or hopeless." },
    { cue: "Visual: a gray crowd. One by one, the figures turn to color." },
    { line: "So why does it feel like everyone else is fine? Because \"I'm fine\" is the easiest thing to say. Stigma teaches us to hide. Research on Asian American and Latinx students found that stigma kept struggling kids from reaching out for help." },
    { cue: "The buzzing stops. Silence." },
    { line: "In Turtles All the Way Down, Aza describes her thoughts as a spiral that keeps getting tighter. But a spiral can turn outward, too." },
    { line: "Know the signs. Sleeping too much or too little. Pulling away from friends. Losing interest in the things you love. Feeling like one bad grade is the end of the world." },
    { line: "If you notice them in yourself, tell someone: a counselor, a parent, a friend. If you notice them in a friend, listen. You don't have to fix it." },
    { cue: "Visual: the number 988 on a phone screen." },
    { line: "Mental health is health. Getting care is a human right, and it shouldn't depend on where you live or how much money your family has. If you're in crisis, call or text 988, any time." },
    { cue: "Pause." },
    { line: "Your now is not your forever." },
    { cue: "Text on screen: Turning Outward. A museum of the right to mental health." }
  ],

  sources: [
    "Centers for Disease Control and Prevention. \"Mental Health.\" <i>Adolescent and School Health</i>, 2 May 2024, <a href=\"https://www.cdc.gov/healthy-youth/mental-health/index.html\">www.cdc.gov/healthy-youth/mental-health/index.html</a>.",
    "Green, John. <i>Turtles All the Way Down</i>. Dutton Books, 2017.",
    "A high school student. Personal interview. Conducted by Ryan Abourjeili, Fall 2026.",
    "United Nations. \"Goal 3: Ensure Healthy Lives and Promote Well-Being for All at All Ages.\" <i>Sustainable Development Goals</i>, <a href=\"https://sdgs.un.org/goals/goal3\">sdgs.un.org/goals/goal3</a>.",
    "United Nations. <i>Universal Declaration of Human Rights</i>. 1948, <a href=\"https://www.un.org/en/about-us/universal-declaration-of-human-rights\">www.un.org/en/about-us/universal-declaration-of-human-rights</a>.",
    "Yu, S. H., et al. \"Determinants of Stigma Against Help-Seeking in Schools and Help-Seeking Behaviors of Asian American and Latinx Youth Experiencing Internalizing Problems.\" <i>Cultural Diversity &amp; Ethnic Minority Psychology</i>, vol. 32, no. 2, 2026, pp. 312–26, <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC13131994/\">pmc.ncbi.nlm.nih.gov/articles/PMC13131994/</a>."
  ],

  team: [
    { name: "Hanrui Huang", role: "Gallery 1: Stigma" },
    { name: "Ryan Abourjeili", role: "Gallery 2: Social media" },
    { name: "Nithil Arun", role: "Gallery 3: Work" },
    { name: "Jewel McCallum", role: "Gallery 4: School" }
  ]
};
