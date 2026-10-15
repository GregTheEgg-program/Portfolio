// Editable portfolio content. Asset paths support subdirectory hosting.
export const media = (name) => `${import.meta.env.BASE_URL}media/${name}`;

export const profile = {
  name: 'Gregory Sherris',
  role: 'Gameplay & engine programmer',
  github: 'https://github.com/GregTheEgg-program',
  linkedin: 'https://www.linkedin.com/in/gregory-sherris-computerscience/',
  email: 'gregsherris@gmail.com',
  graduation: 'May 2028',
  portrait: 'gregory-sherris.jpeg',
  availability: 'Seeking a Summer 2027 internship',
  introduction: 'I’m an RTIS student at DigiPen building gameplay, physics, and the engine systems that turn ideas into playable experiences.',
  about: [
    'I enjoy working where gameplay and engine programming meet: building reusable systems, giving designers useful tools, and turning an idea into something a player can interact with.',
    'My projects range from custom C and C++ engines to team games in Unity and Unreal Engine 5. I’ve worked alongside programmers, artists, sound designers, and game designers to bring both systems and gameplay together.',
    'My first finished team project was Up We Goat, a two-week DigiPen Pre-College game. Since then, I’ve continued building collaborative projects at DigiPen, with a growing focus on gameplay, physics, and engine tools.',
  ],
};

export const skills = [
  { label: 'Languages', items: ['C', 'C++', 'C#', 'Java', 'Python'] },
  { label: 'Engines & tools', items: ['Custom engines', 'Unity', 'Unreal Engine 5', 'Blueprints', 'ImGui', 'GLM'] },
  { label: 'Systems & workflow', items: ['Collision', 'Particles', 'Enemy AI', 'Action lists', 'Git / GitHub', 'Perforce'] },
];

export const projects = [
  {
    id: 'goblin-man', title: 'Goblin Man', category: 'custom',
    course: 'GAM 200 / 250', type: 'Custom engine',
    stack: ['C++', 'ImGui', 'GLM'], role: 'Engine & gameplay programmer',
    teamSize: '4 → 5 people', duration: 'Two-semester project',
    image: 'GoblinManLogo.png', imageWidth: 364, imageHeight: 364,
    imageAlt: 'Goblin Man game thumbnail',
    poster: 'goblin-man-poster.jpg',
    trailer: 'goblin-man-trailer.mp4', trailerLabel: 'Goblin Man trailer, 45 seconds',
    summary: 'Guide a remarkably resilient goblin and his much more fragile Goblittles out of a cave filled with crushing hazards.',
    contribution: 'I built collision and transform systems, a customizable particle system, enemy behavior, and tools for creating gameplay.',
    introduction: 'Goblin Man is a game about protecting a group of Goblittles as they make their way out of a dangerous cave. Their guardian can survive a lot more than they can, so moving safely through each obstacle is essential.',
    highlights: [
      { title: 'The engine behind the game', text: 'I primarily worked on collision and transformation systems in our custom C++ engine. I also contributed ImGui tools, action lists, and a templated action system that animates values through configurable getters and setters.' },
      { title: 'Particles without the entity overhead', text: 'I reworked the particle system to reuse a pool of particle data and render directly through the graphics system, avoiding the cost of creating a full entity and its components for every particle. The system supports configurable position, velocity, acceleration, scale, rotation, opacity, and lifetime, and targets effects of up to 10,000 particles.' },
      { title: 'Enemies and player interactions', text: 'I implemented enemies and contributed to player behavior. One example is the Bonkera: a mushroom hazard with a timed rest, climb, stall, and slam cycle. Its action lists coordinate motion, collision checks trigger the player’s squash response, and a landing triggers particles and audio.' },
      { title: 'Tools for the team', text: 'I created utilities for developing behaviors and scripts, alongside configurable engine systems that could be reused across gameplay features.' },
    ],
    teams: [
      { label: 'First half', people: 'Gregory Sherris, Grant M., Brandon L., and Owen W.' },
      { label: 'Second half', people: 'Gregory Sherris, Brandon L., Owen W., Buddy L., and Scott K.' },
    ],
    code: ['particles', 'bonkera', 'collision'],
  },
  {
    id: 'gamblers-never-quit', title: 'Gamblers Never Quit', category: 'custom',
    course: 'GAM 150', type: 'Custom engine',
    stack: ['C', 'Action lists', 'Gameplay systems'], role: 'Gameplay & systems programmer',
    teamSize: '5 people', duration: 'Approximately 10 weeks',
    image: 'GamblersNeverQuit.png', imageWidth: 823, imageHeight: 798,
    imageAlt: 'Gamblers Never Quit game thumbnail',
    poster: 'gamblers-never-quit-poster.jpg',
    trailer: 'gamblers-never-quit-trailer.mp4', trailerLabel: 'Gamblers Never Quit trailer, 32 seconds',
    playUrl: '', // Add the DigiPen game page when available.
    summary: 'An incremental game built around casino-style minigames: earn more, raise the stakes, and see how far your score can go.',
    contribution: 'I developed the action list system and the slots scene in a custom C engine.',
    introduction: 'Created during my second semester at DigiPen, Gamblers Never Quit lets players build their score through a collection of casino-style games. Increasing winnings makes larger bets possible, creating a simple loop of risk and progression.',
    highlights: [
      { title: 'A reusable action list system', text: 'I built a time-based action system for moving, rotating, scaling, resizing, and fading objects, with both linear interpolation and sine-based easing. The team used it in the title screen, slot machine, and card-hand presentation.' },
      { title: 'From optional scene to finished minigame', text: 'I developed the slots scene, where players choose a bet and pull a lever to reveal a randomized combination of faces. The payout depends on the result, ranging from no return to a 50× multiplier. Although slots was not originally planned for the final release, it became polished enough to include.' },
      { title: 'A focused team production', text: 'Our five-person team built the game in approximately ten weeks using a custom engine written in C.' },
    ],
    teams: [{ label: 'Team', people: 'Gregory Sherris, Desmond, Christian, Grant, and Joshua.' }],
    code: ['actions'],
  },
  {
    id: 'surfing-poseidon', title: 'Surfing Poseidon', category: 'unity',
    image: 'SurfingPosiedonLogo.png', imageWidth: 250, imageHeight: 198,
    imageAlt: 'Surfing Poseidon game thumbnail',
    course: 'GAM 300 · Spark 01', type: 'Game jam',
    stack: ['Unity', 'C#', 'Player systems'],
    role: 'Player systems programmer', teamSize: '3 people', duration: '',
    focusSteps: ['Movement', 'Tricks', 'Style'],
    summary: 'Surf the ocean as Poseidon, defeat hostile seals, and build enough score to win through movement and tricks.',
    contribution: 'I implemented player movement, tricks, and a style system built around slow-motion quick-time events.',
    introduction: 'Surfing Poseidon was the first of two Spark game jams I developed with a three-person team for GAM 300 at DigiPen. Built in Unity, it follows Poseidon through an ocean challenge where defeating hostile seals and earning points are key to reaching the score target.',
    highlights: [
      { title: 'Player movement and tricks', text: 'I was primarily responsible for the player and the systems connected to him, including movement, tricks, and the style meter.' },
      { title: 'A style meter that rewards momentum', text: 'The style meter decreases when the player stops performing tricks. Completing tricks well raises the meter, encouraging players to keep chaining actions instead of staying idle.' },
      { title: 'Slow-motion trick sequences', text: 'Jumping from a wave or riding a water tornado creates an opportunity to perform tricks. Time slows while the player completes quick-time events, and the sequence ends on landing or when the trick limit for that wave or tornado is reached.' },
    ],
    code: [],
  },
  {
    id: 'the-tower', title: 'The Tower', category: 'unreal',
    image: 'TheTowerLogo.png', imageWidth: 823, imageHeight: 798,
    imageAlt: 'The Tower game thumbnail',
    course: 'GAM 300 · Spark 02', type: 'Game jam',
    stack: ['Unreal Engine 5', 'Blueprints', 'C++'],
    role: 'Gameplay programmer', teamSize: '3 people', duration: '',
    focusSteps: ['Drop', 'Stack', 'Score'],
    summary: 'Stack a tower as high as possible to increase your score while disruptive blocks threaten its stability.',
    contribution: 'I built block dropping, custom block types, scoring, and UI, primarily in Blueprints with some C++ work.',
    introduction: 'The Tower was the second Spark game jam I created with a three-person team for GAM 300 at DigiPen. Built in Unreal Engine 5, it challenges players to stack a tower higher while contending with blocks that can sabotage the structure.',
    highlights: [
      { title: 'Block dropping and custom blocks', text: 'I implemented the object-dropping mechanic and the custom blocks players place on the tower. Most of the gameplay was created with Blueprints, with some C++ work supporting the block-dropping system.' },
      { title: 'Scoring and interface', text: 'I built the score system and UI, connecting the tower-building loop to visible player progress as the stack grows.' },
      { title: 'Putting Unreal into practice', text: 'This was my first team game-development experience with Unreal. My previous Unreal projects had focused on learning the engine, so this Spark gave me an opportunity to apply that knowledge in a playable game.' },
    ],
    code: [],
  },
  {
    id: 'up-we-goat', title: 'Up We Goat', category: 'unity',
    image: 'UpWeGoatLogo.png', imageWidth: 233, imageHeight: 239,
    imageAlt: 'Up We Goat game thumbnail',
    course: 'DigiPen Pre-College', type: 'Team game',
    stack: ['Unity', 'C#', 'Platforming'], role: 'One of two programmers',
    teamSize: '6 people', duration: '2 weeks',
    repository: 'https://github.com/DreamDoggo/Up-We-Goat',
    focusSteps: ['Climb', 'Dodge', 'Eat'],
    summary: 'Climb higher, dodge obstacles, and keep eating on a goat’s ambitious journey to the top.',
    contribution: 'I implemented obstacles, platforms, and many of the particle effects, and helped develop the initial concept.',
    introduction: 'Up We Goat was created in two weeks for the DigiPen Pre-College Program. Our six-person team brought together programming, art, sound design, and game design to turn an original idea into a finished game.',
    highlights: [
      { title: 'Building the climb', text: 'As one of the team’s two programmers, I primarily implemented obstacles and platforms, as well as many of the particle effects. I also helped shape the initial game concept.' },
      { title: 'My first finished team game', text: 'Before Up We Goat, I mostly worked on solo projects. This was my first experience collaborating with a multidisciplinary team to deliver a complete game.' },
    ], code: [],
  },
  {
    id: 'rock-paper-city', title: 'Rock, Paper, City', category: 'unity',
    image: 'RockPaperCityLogo.png', imageWidth: 1641, imageHeight: 780,
    imageAlt: 'Rock, Paper, City game thumbnail',
    course: 'Team project', type: 'Unity game',
    stack: ['Unity', 'C#', 'AI & combat'], role: 'One of two programmers',
    teamSize: 'Multidisciplinary team', duration: '',
    repository: 'https://github.com/GregTheEgg-program/RPS',
    focusSteps: ['Choose', 'Combine', 'Counter'],
    summary: 'Rock, paper, scissors becomes a tactical duel where move combinations unlock abilities, and your opponent plans combinations of its own.',
    contribution: 'I programmed enemy AI, combat resolution, and the attack-combination system.',
    introduction: 'Rock, Paper, City expands a familiar three-choice game into a combat system. Players build sequences of moves to activate special abilities, manage health, and outthink an opponent that also pursues its own combinations.',
    highlights: [
      { title: 'Combat and combinations', text: 'I implemented round resolution and attack combinations. Specific sequences unlock effects such as restoring health, increasing damage, or forcing the opponent to choose paper.' },
      { title: 'An opponent with a plan', text: 'I programmed enemy decision-making so the AI actively works toward combinations rather than choosing each move independently.' },
      { title: 'Collaborative development', text: 'I was one of two programmers, working alongside artists, a sound designer, and a game designer.' },
    ], code: [],
  },
];

export const snippets = {
  actions: {
    title: 'Time-based actions', language: 'C', file: 'actionListUpdate',
    note: 'Abridged from the supplied source. Other action types are omitted; local names and comments are cleaned up.',
    code: `void actionListUpdate(Action* list, Entity* entityList, float dt) {
    for (int i = 0; i < size; ++i) {
        if (!list[i].inUse) continue;
        Action* action = list + i;
        Entity* entityObj = getEntity(action->ID, entityList);
        if (!entityObj) {
            action->inUse = 0;
            continue;
        }
        action->curTime += dt;
        if (action->curTime < 0.0f) continue;
        float percent = action->curTime / action->totalTime;
        if (percent > 1.0f) percent = 1.0f;
        Transform* transform = EntityGetTransform(entityObj);
        DGL_Vec2* translation = TransformGetTranslation(transform);
        float eased = sinf(percent * pi * 0.5f);
        // Translation can use eased or linear progress.
        switch (action->type) {
        case 1:
            moveUpdate(translation, action->startPos,
                       action->endPos, eased);
            TransformSetTranslation(transform, translation);
            break;
        case 6:
            moveUpdate(translation, action->startPos,
                       action->endPos, percent);
            TransformSetTranslation(transform, translation);
            break;
        // Rotation, scale, size, and opacity cases omitted.
        }
        if (action->curTime >= action->totalTime)
            action->inUse = 0;
    }
}`,
  },
  particles: {
    title: 'Reusing particle data', language: 'C++', file: 'ParticleEmitter.cpp',
    note: 'Abridged from the supplied source; comments and local names are cleaned up for presentation.',
    code: `ParticleEmitter::Particle* ParticleEmitter::GetUnusedParticle() {
    for (auto& particle : _particlePool) {
        if (!particle.activated) return &particle;
    }
    return nullptr;
}

void ParticleEmitter::RespawnParticle(Particle* particle) {
    particle->translation[0] =
        randomRange<float>(_startOffset[0][0], _startOffset[1][0]);
    particle->translation[1] =
        randomRange<float>(_startOffset[0][1], _startOffset[1][1]);
    particle->scale = randomRange<float>(_size[0], _size[1]);
    particle->rotation =
        randomRange<float>(_rotation[0], _rotation[1]);
    // Other configurable spawn settings omitted.
    particle->currLifeTime =
        -randomRange<float>(_lifeTime[0], _lifeTime[1]);
    particle->activated = true;
}

void ParticleEmitter::Render() const {
    glm::mat4 parentMatrix =
        GetParent()->GetComponent<Transform>(cTransform)->GetMatrix();
    parentMatrix[0][0] = 1.0f;
    parentMatrix[1][1] = 1.0f;
    for (const auto& particle : _particlePool) {
        if (!particle.activated) continue;
        if (_connectedToParent)
            Graphics::Draw(_sharedShader,
                parentMatrix * particle.transMatrix,
                _sharedMesh, _sharedTexture, particle.alpha);
        else
            Graphics::Draw(_sharedShader, particle.transMatrix,
                _sharedMesh, _sharedTexture, particle.alpha);
    }
}`,
  },
  bonkera: {
    title: 'The Bonkera state cycle', language: 'C++', file: 'BehaviorBonkera::OnUpdate',
    note: 'Abridged from the supplied source; the optional sound variation is omitted.',
    code: `void BehaviorBonkera::OnUpdate(float dt) {
    _timer -= dt;
    switch (_currState) {
    case movementStates::Break:
        if (_timer <= 0) {
            antiDougAnger(_climbTime, movementStates::Climb);
            _actionList->addAction(
                ScaleAction(_climbTime, _climbScale));
            _actionList->addAction(RotateAction(
                _climbTime, transform->GetRotation() - _turnAmount));
        }
        break;
    case movementStates::Climb:
        if (_timer <= 0)
            antiDougAnger(_stallTime, movementStates::Stall);
        break;
    case movementStates::Stall:
        if (_timer <= 0) {
            antiDougAnger(_stompTime, movementStates::Fall);
            _actionList->addAction(
                ScaleAction(_stompTime, 1.0f / _climbScale));
            _actionList->addAction(RotateAction(
                _stompTime, transform->GetRotation() - _turnAmount));
        }
        break;
    case movementStates::Fall:
        if (_timer <= 0) {
            GetParent()->GetComponent<ParticleEmitter>(cEmitter)->Emit(50);
            GetParent()->GetComponent<AudioSource>(cAudioSource)->Play();
            antiDougAnger(_restTime, movementStates::Break);
        }
        break;
    }
}`,
  },
  collision: {
    title: 'Connecting collision to player behavior', language: 'C++',
    file: 'BehaviorPlayer::OnCollisionEnter',
    note: 'Adapted from the supplied source; the component lookup is assigned to a local variable for readability.',
    code: `void BehaviorPlayer::OnCollisionEnter(Collider* collider) {
    if (collider->GetParent()->NameContains("Bonkera")) {
        auto* bonkera = collider->GetParent()
            ->GetComponent<BehaviorBonkera>(cBehavior);
        if (!bonkera->CanPass()) {
            Squash(getDT());
        }
    }
}`,
  },
};
