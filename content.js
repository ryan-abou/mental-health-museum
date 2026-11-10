/* All museum text lives here so the group can edit it without touching the layout code.
   To add the finished PSA video, paste its YouTube link between the quotes below
   (e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"). */
window.PSA_VIDEO_URL = "";

window.MUSEUM = {
  title: "Turning Outward",
  subtitle: "A museum about the right to mental health",
  course: "AP Lang and Comp, Dr. Gingrich, Fall 2026",

  rooms: [
    /* ---------------------------------------------------------------- LOBBY */
    {
      id: "lobby",
      short: "Lobby",
      name: "The Lobby",
      curator: "the whole team",
      wall: "#0e1526",
      ink: "#e2e6f0",
      accent: "#9fb3e0",
      intro: [
        "We think getting help for your mental health should be treated as a human right. Article 25 of the Universal Declaration of Human Rights says everyone has a right to medical care, and UN Goal 3.4 asks countries to promote mental health and well-being by 2030. Neither one means much if a student can't get help without paying a lot, waiting months, or feeling embarrassed to ask.",
        "We made this museum for middle and high school students, especially anyone stressed about APs or college. There are five rooms: stigma, social media, work, school, and the book <cite>Turtles All the Way Down</cite>. If you only remember one thing, make it the exit room: the signs that someone is struggling and where to get help."
      ],
      facts: [],
      pov: "A student we talked to needs mental health help that is easy to get. School stress, hard classes, and worry about the future affect her grades, her friendships, and how she feels.",
      hmw: "How might we build a museum that shows students like her where to find help and makes it feel okay to ask?",
      voices: [
        { q: "What does mental well-being mean to you?", a: "Honestly, just feeling okay in your own head. Like you can have a bad day and not spiral about it." },
        { q: "Do you think mental health receives enough attention in schools and communities?", a: "Nah, not really. [My school] specifically puts up some posters and call it a day." },
        { q: "How does good mental health affect a person's daily life?", a: "It changes pretty much everything. Sleep, how you treat people, whether you even feel like doing your work. When I'm in a good place, a bad grade is like, okay, whatever, I'll fix it. When I'm not, it feels like the end of the world." },
        { q: "Have you ever felt that your mental health affected your performance at school, work, or in relationships?", a: "Yeah, for sure. When I'm stressed I procrastinate more, which makes me more stressed, so it just loops. I've also snapped at people when I was overwhelmed even though it wasn't their fault." },
        { q: "What kinds of support have been most helpful when you're feeling overwhelmed?", a: "Someone just listening without trying to fix it right away." },
        { q: "What barriers might prevent people from getting mental health support?", a: "Money is the biggest one, since therapy is expensive and insurance is confusing. Waitlists are super long too. And for teens, you usually need a parent to approve it or drive you, which can be a problem." },
        { q: "What could schools or communities do to better support mental well-being?", a: "[My school] could hire more counselors, and ones who actually have time for students. Less crazy workloads would help too. And just making it normal to ask for help, like not weird at all, would be very helpful." }
      ],
      tour: "Welcome to Turning Outward, a museum about the right to mental health. On the left is our short video. On the right are notes from a student we interviewed. Her answers shaped every room. When you're ready, go through the first door to the room about stigma."
    },

    /* ------------------------------------------------------------- ROOM 1 */
    {
      id: "stigma",
      number: 1,
      short: "Stigma",
      name: "Mental Health Stigma",
      curator: "Hanrui Huang",
      wall: "#171a37",
      ink: "#e6e2f3",
      accent: "#b6a6e3",
      intro: [
        "Stigma is when people think having a mental health problem means you're weak or broken. Most of the time it's quiet, like a joke at someone's expense, a subject that gets changed fast, or a friend who says \"I'm fine\" when they're not.",
        "People who feel that stigma usually hide what they're going through, so nobody knows to help them."
      ],
      artifacts: [
        {
          art: "crowd",
          title: "The One in Color",
          medium: "Painted people on a wall",
          label: "A gray crowd stands together. One person in color stands alone. That's how stigma feels: like everyone else is fine except you.",
          closer: "Look again. Now everyone is in color. In 2023, 4 out of 10 high school students said they felt sad or hopeless almost every day for weeks (CDC). You were never the only one.",
          book: {
            quote: "I was somebody's something.",
            cite: "Green 2",
            note: "Aza feels like a side character in other people's lives. She keeps her real feelings hidden. Stigma pushes people to do the same thing."
          }
        },
        {
          art: "mask",
          title: "The \"I'm Fine\" Mask",
          medium: "Cracked mask with writing on it",
          label: "This mask is covered with things we say to hide how we feel: \"I'm fine.\" \"Just tired.\" \"It's whatever.\"",
          closer: "Look through the cracks. Now you can read what the mask was hiding. The cracks let the truth out, so someone can finally help.",
          book: {
            quote: "Maybe I'm just a lie that I'm whispering to myself.",
            cite: "Green 105",
            note: "Aza hides how bad her thoughts get, even from her mom and her best friend. The mask is the face she shows. This quote is what's underneath."
          }
        }
      ],
      connect: "Stigma keeps students from getting help. A 2026 study of more than 2,000 students found that shame kept many kids who felt anxious or sad from asking for help (Yu et al.). The world can't reach Goal 3.4 if students are too embarrassed to ask.",
      tour: "This is the room about stigma, made by Hanrui Huang. First, a gray crowd with one person in color. Stigma makes you feel like the only one who is struggling. Press Look closer to see the truth. Next is the I'm fine mask. Look through its cracks to see what it hides. In the book, Aza hides her worries from almost everyone. Go through the next door to the room about social media."
    },

    /* ------------------------------------------------------------- ROOM 2 */
    {
      id: "social",
      number: 2,
      short: "Social media",
      name: "Mental Health on Social Media",
      curator: "Ryan Abourjeili",
      wall: "#212b57",
      ink: "#e8ecf8",
      accent: "#94c3ea",
      intro: [
        "For a lot of us, the phone is the first thing we check in the morning and the last thing at night. It keeps us close to friends, and it also shows us everyone's best moments all day long.",
        "This room has a phone and a mirror."
      ],
      artifacts: [
        {
          art: "phone",
          title: "A Teen's Phone",
          medium: "Phone and search history",
          label: "The feed is beach trips and straight A's, and the screen time says almost 8 hours today. It's easy to compare your whole life to someone else's highlights.",
          closer: "Now look at the searches from 2 a.m. These are questions people ask the internet because they're scared to ask a person. The internet has an answer for every one of them, and none of those answers come from someone who knows her.",
          book: {
            quote: "True terror isn't being scared; it's not having a choice in the matter.",
            cite: "Green 22",
            note: "Aza worries that she has a dangerous infection. She reads about it online over and over. Every search makes her more scared."
          }
        },
        {
          art: "mirror",
          title: "The Perfect Mirror",
          medium: "Gold frame and filtered glass",
          label: "This mirror shows you with a beauty filter: smooth skin, perfect light, and sparkles. Look at it long enough, and your real face starts to feel wrong.",
          closer: "With the filter off, the eyes are normal size and the sparkles are gone. Nothing about this face needed fixing. The problem was comparing it to the filtered one in the first place.",
          book: {
            quote: "I was a story riddled with plot holes.",
            cite: "Green 253",
            note: "Aza feels like she is full of flaws. Social media makes everyone else look like they have none. Aza starts to get better once she stops hiding hers."
          }
        }
      ],
      connect: "The student we interviewed said comparing yourself to others online is a big cause of stress. Supporting mental health (Goal 3.4) means helping students know when to log off and when to talk to a real person.",
      tour: "This is the room about social media, made by Ryan Abourjeili. First, a teen's phone. The feed shows everyone's best moments. Press Look closer to see what people search at 2 in the morning. In the book, Aza looks up her fears online, and it only makes them worse. Next is the perfect mirror. Look closer to turn off the filter. Go through the next door to the room about work."
    },

    /* ------------------------------------------------------------- ROOM 3 */
    {
      id: "work",
      number: 3,
      short: "Work",
      name: "Mental Health at Work",
      curator: "Nithil Arun",
      wall: "#45325a",
      ink: "#f6ecef",
      accent: "#f4b894",
      intro: [
        "Lots of teens have jobs, sports, clubs, and homework. When every hour is full, rest starts to feel like something you have to earn.",
        "This room looks at where the hours in a day actually go."
      ],
      artifacts: [
        {
          art: "clock",
          title: "The Balance Clock",
          medium: "Clock that shows one day",
          label: "This clock shows a healthy day, with time for sleep, school, friends, family, and breaks.",
          closer: "This is the same day during a busy week. Work and homework take over the clock, and sleep gets squeezed to five hours.",
          book: {
            quote: "I was so good at being a kid, and so terrible at being whatever I was now.",
            cite: "Green 25",
            note: "Aza feels the stress of growing up. Her friend Daisy has it even harder. Daisy works at Chuck E. Cheese and worries about paying for college. That's why she wants the $100,000 reward so badly."
          }
        },
        {
          art: "poster",
          title: "The Break Room Poster",
          medium: "Poster with tear-off tabs",
          label: "This poster says \"It's okay to clock out.\" Breaks are part of doing the work well, and most people need permission to take them.",
          closer: "Each tab has a real way to get help. The student we interviewed said her school \"puts up some posters and call it a day,\" so we wanted a poster you could actually take something from.",
          book: {
            quote: "Life is a series of choices between wonders.",
            cite: "Green 188",
            note: "Davis writes this on his blog. Taking a break is one of those choices, and it's an allowed one."
          }
        }
      ],
      connect: "When we asked a student what would help, she said smaller workloads. Supporting mental health (Goal 3.4) means building real breaks into the day.",
      tour: "This is the room about work, made by Nithil Arun. First, the balance clock shows a healthy day. Press Look closer to see a busy week, when work takes over everything. In the book, Daisy works long shifts and worries about money for college. Next is a poster that says it's okay to clock out. Its tabs point to real help. Go through the next door to the room about school."
    },

    /* ------------------------------------------------------------- ROOM 4 */
    {
      id: "school",
      number: 4,
      short: "School",
      name: "Mental Health at School",
      curator: "Jewel McCallum",
      wall: "#eac4aa",
      ink: "#2c1820",
      accent: "#86393a",
      intro: [
        "Students spend most of their day at school, so it's where a lot of mental health problems show up, and also where they get missed. Bullying follows kids home on their phones, and a full cafeteria can still feel lonely.",
        "School is also where help is closest, whether that's a counselor or a friend who saves you a seat."
      ],
      artifacts: [
        {
          art: "chat",
          title: "The Phone Under the Desk",
          medium: "Group chat",
          label: "A group chat during class. The jokes are fast, and they're all aimed at one person. Online bullying keeps going after school ends.",
          closer: "If it's happening to you, screenshot it, block them, report it, and tell an adult you trust. If it's happening to a friend, message them that night.",
          book: {
            quote: null,
            cite: "Green, key scene",
            note: "Aza reads a story Daisy posted online. One character is clearly based on Aza, and Daisy makes her seem annoying and hard to be around. Daisy didn't mean it as bullying, but it still hurts. The two friends only fix things by talking face to face."
          }
        },
        {
          art: "table",
          title: "The Lunch Table for One",
          medium: "Cafeteria table and tray",
          label: "One student sits alone at a long table. For a kid without friends, lunch can be the hardest part of the day.",
          closer: "Now the seats are full. It only takes one person to sit down. The CDC says feeling connected at school is one of the best ways to protect students' mental health.",
          book: {
            quote: "Our lunch table was like a long-running play on Broadway",
            cite: "Green 2",
            note: "Aza has friends at lunch, but she feels like she's just playing a part. You can be around people and still feel alone."
          }
        }
      ],
      connect: "School is where Goal 3.4 can help teens the most. The CDC says schools should connect students to mental health care, train teachers, and make school feel safe and welcoming.",
      tour: "This is the room about school, made by Jewel McCallum. First, a phone with a mean group chat. Press Look closer to see what you can do: screenshot, block, report, and tell someone. In the book, a story Daisy posts online hurts Aza, and they fix it by talking face to face. Next is a lunch table with one student. Look closer, and the seats fill up. Go through the next door to the book room."
    },

    /* ------------------------------------------------------------- ROOM 5 */
    {
      id: "book",
      number: 5,
      short: "The book",
      name: "Turtles All the Way Down",
      curator: "the whole team",
      wall: "#f3dcaa",
      ink: "#2a1d0c",
      accent: "#874912",
      dark: true,
      intro: [
        "This book by John Green came out in 2017. It's about Aza Holmes, a 16-year-old with anxiety and OCD (obsessive-compulsive disorder). John Green has OCD, too.",
        "Aza has a therapist and a mom who loves her, which many teens don't. Her story shows what good care looks like."
      ],
      artifacts: [
        {
          art: "spiral",
          title: "The Spiral",
          medium: "Wire sculpture",
          label: "Aza says her thoughts are like a spiral. One worry circles tighter and tighter until it's all she can think about.",
          closer: "Follow this spiral outward instead and it gets wider, toward a friend, a parent, a therapist, and writing things down. That's where the museum's name comes from.",
          book: {
            quote: "The thing about a spiral is, if you follow it inward, it never actually ends.",
            cite: "Green 7",
            note: "Aza can't decide to stop thinking about her worries, which is why she needs actual treatment."
          }
        },
        {
          art: "turtles",
          title: "The Tower of Turtles",
          medium: "Carved turtles",
          label: "The book's title comes from an old story. A woman says the world sits on a giant turtle. What holds up that turtle? \"It's turtles all the way down.\"",
          closer: "Aza keeps looking for the bottom turtle: one final answer that will stop her worries. Daisy tells her it doesn't work that way. You don't have to find the bottom to keep standing.",
          book: {
            quote: "Your now is not your forever.",
            cite: "Green 93",
            note: "Aza's mom tells her this. It means hard times don't last forever, even when it feels like they will."
          }
        }
      ],
      connect: "This book connects to every room. It shows shame (Aza hiding), the internet making fear worse, money stress (Daisy), and friends hurt by things they didn't say. It also shows the right to mental health in action: a teen who can see a therapist and has people who keep showing up for her.",
      tour: "Welcome to the book room, all about Turtles All the Way Down by John Green. First, the spiral. Aza says a spiral never ends if you follow it inward. Press Look closer, and it turns outward toward help. Next is the tower of turtles, from the story that gives the book its name. Aza's mom tells her, your now is not your forever. Go through the last door to the exit, where you can find help."
    },

    /* --------------------------------------------------------------- EXIT */
    {
      id: "exit",
      short: "Exit",
      name: "Before You Go",
      curator: "the whole team",
      wall: "#e4eff6",
      ink: "#10293b",
      accent: "#1c5d8c",
      intro: [
        "Before you leave, here are the signs to watch for and where to get help."
      ],
      signs: [
        "Sleeping a lot more or a lot less",
        "Pulling away from friends, family, or hobbies",
        "Getting angry or upset easily",
        "Grades dropping, or putting things off",
        "Saying they feel hopeless or like a burden",
        "Acting like one bad day is the end of the world"
      ],
      help: [
        "Listen first. The student we interviewed said what helps most is \"someone just listening.\"",
        "Ask how they're really doing, and wait for the answer.",
        "Help them find the next step: a counselor, a parent, or a doctor.",
        "If they might be in danger, tell a trusted adult right away, even if they asked you not to."
      ],
      resources: [
        { name: "988 Suicide & Crisis Lifeline", how: "Call or text 988. It's free, any time.", url: "https://988lifeline.org" },
        { name: "Crisis Text Line", how: "Text HOME to 741741.", url: "https://www.crisistextline.org" },
        { name: "Your school counselor", how: "Visit the front office or send an email.", url: null },
        { name: "A trusted adult", how: "A parent, coach, teacher, or doctor you trust.", url: null }
      ],
      tour: "This is the exit, and the most important room. Here you'll find the signs that someone is struggling, how to help a friend, and where to get help. If you or someone you know needs help right now, call or text 988. Thank you for visiting Turning Outward. Remember: your now is not your forever."
    }
  ],

  psaScript: [
    { cue: "Picture: a desk at night. A planner with three due dates circled, a phone lighting up." },
    { line: "We asked a high school student what stresses her out." },
    { line: "“School for sure, especially if you’re taking a bunch of APs. Then there’s college stuff, and everybody comparing themselves to everyone else online,” she says." },
    { line: "She’s not the only one. In 2025, the CDC found that about 1 in 3 high school students felt sad or hopeless almost every day for at least two weeks." },
    { cue: "Picture: a gray crowd. One by one, a few people turn to color." },
    { line: "We asked her how that shows up in a normal day." },
    { line: "“When I’m in a good place, a bad grade is like, okay, whatever, I’ll fix it. When I’m not, it feels like the end of the world,” she says." },
    { line: "And once it starts, it’s hard to stop." },
    { line: "“When I’m stressed I procrastinate more, which makes me more stressed, so it just loops,” she says." },
    { cue: "Picture: a spiral being drawn in a notebook, tighter and tighter." },
    { line: "In Turtles All the Way Down, Aza has a name for that loop. She calls it a spiral. If you follow it inward, Aza says, it never actually ends." },
    { line: "What helps her is other people. Her mom. Her best friend, Daisy. A therapist she can actually go see." },
    { cue: "Pause." },
    { line: "So why don’t more of us ask for help?" },
    { line: "Our interviewee had a list ready. Therapy costs money. Insurance is confusing. Waitlists are long. And most teens need a parent to sign off, or drive them." },
    { line: "It shows. Of the students who felt that sad, only about 3 in 10 got counseling or therapy. Almost as many said they needed it and couldn’t get it." },
    { line: "“It depends on where you live and how much money you have,” she says." },
    { cue: "Picture: someone typing “I’m fine” and hitting send." },
    { line: "Then there’s shame. Saying “I’m fine” is just easier. One study of more than two thousand students found that the ones struggling the most felt the most shame about asking." },
    { line: "In 1966, the United Nations wrote that everyone has a right to “the highest attainable standard of physical and mental health.” Everyone." },
    { line: "But a right only works if you can use it. That means help families can afford, and asking for it being normal." },
    { line: "She told us what schools could do. Hire “more counselors, and ones who actually have time for students.”" },
    { line: "“And just making it normal to ask for help, like not weird at all, would be very helpful,” she says." },
    { cue: "Picture: one friend sitting down next to another at a lunch table." },
    { line: "If a friend seems off, ask how they’re doing. Then actually listen. That’s what helped her most." },
    { line: "“Someone just listening without trying to fix it right away,” she says." },
    { line: "If it’s you, talk to a counselor or an adult you trust. If it’s an emergency, call or text 988." },
    { cue: "Words on screen: 988 Suicide & Crisis Lifeline. Call or text 988, any time. Sources: CDC; United Nations; Yu et al.; John Green; our interview." }
  ],

  sources: [
    "Centers for Disease Control and Prevention. \"Mental Health.\" <i>Adolescent and School Health</i>, 2 May 2024, <a href=\"https://www.cdc.gov/healthy-youth/mental-health/index.html\">www.cdc.gov/healthy-youth/mental-health/index.html</a>.",
    "Centers for Disease Control and Prevention. \"Mental Health and Suicide Risks.\" <i>Youth Health in Focus: Youth Risk Behavior Survey 2025</i>, 2026, <a href=\"https://www.cdc.gov/yrbs/youth-health-in-focus/mental-health.html\">www.cdc.gov/yrbs/youth-health-in-focus/mental-health.html</a>.",
    "Centers for Disease Control and Prevention. \"Unmet Need for Mental Health Services Among High School Students Experiencing Persistent Feelings of Sadness or Hopelessness: Youth Risk Behavior Survey, United States, 2025.\" <i>MMWR Supplements</i>, vol. 75, no. 1, 15 Oct. 2026, <a href=\"https://www.cdc.gov/mmwr/volumes/75/su/su7501a4.htm\">www.cdc.gov/mmwr/volumes/75/su/su7501a4.htm</a>.",
    "Green, John. <i>Turtles All the Way Down</i>. Dutton Books, 2017.",
    "A high school student. Personal interview. Conducted by Ryan Abourjeili, Fall 2026.",
    "United Nations. <i>International Covenant on Economic, Social and Cultural Rights</i>. 1966, Article 12, <a href=\"https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-economic-social-and-cultural-rights\">www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-economic-social-and-cultural-rights</a>.",
    "United Nations. \"Goal 3: Ensure Healthy Lives and Promote Well-Being for All at All Ages.\" <i>Sustainable Development Goals</i>, <a href=\"https://sdgs.un.org/goals/goal3\">sdgs.un.org/goals/goal3</a>.",
    "United Nations. <i>Universal Declaration of Human Rights</i>. 1948, <a href=\"https://www.un.org/en/about-us/universal-declaration-of-human-rights\">www.un.org/en/about-us/universal-declaration-of-human-rights</a>.",
    "Yu, S. H., et al. \"Determinants of Stigma Against Help-Seeking in Schools and Help-Seeking Behaviors of Asian American and Latinx Youth Experiencing Internalizing Problems.\" <i>Cultural Diversity &amp; Ethnic Minority Psychology</i>, vol. 32, no. 2, 2026, pp. 312–26, <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC13131994/\">pmc.ncbi.nlm.nih.gov/articles/PMC13131994/</a>."
  ],

  team: [
    { name: "Hanrui Huang", role: "Room 1: Stigma" },
    { name: "Ryan Abourjeili", role: "Room 2: Social media" },
    { name: "Nithil Arun", role: "Room 3: Work" },
    { name: "Jewel McCallum", role: "Room 4: School" }
  ]
};
