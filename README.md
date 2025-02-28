# Guitar Note Fun 🎸

An interactive web application designed to help kids (ages 6-12) learn to read guitar notation through fun gameplay and instant feedback.

## Features

- 🎵 Real-time pitch detection
- 🎯 Instant audio and visual feedback
- 🏆 Progress tracking with scores and streaks
- 📈 Multiple difficulty levels
- 💡 Helpful tips and guidance
- 🎮 Engaging, kid-friendly interface

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Web Audio API (Pitch Detection)
- Stripe (Payment Processing)

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.6.7 or later
- A modern web browser with microphone support

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/guitar-note-fun.git
cd guitar-note-fun
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your environment variables:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Free Tier
- Access to 3 basic notes (E4, B3, G3)
- Basic gameplay features
- Progress tracking

### Paid Tier ($2.99/month or $29.99/year)
- Full access to all notes and frets
- Multiple difficulty levels
- Customizable settings
- Priority support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PitchDetect](https://github.com/cwilso/PitchDetect) for pitch detection implementation
- [Neobrutalism Components](https://github.com/ekmas/neobrutalism-components) for UI design inspiration
