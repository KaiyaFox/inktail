# InkTail: Revolutionizing Commission-Based Art and Media Collaboration

## About

### The Problem
Existing commission-based platforms often struggle with ineffective communication channels and unreliable service, leading to frustration among users. Many platforms lack robust features for seamless collaboration, while others suffer from issues like ghosting.

### The Solution
InkTail addresses these challenges by providing a dedicated platform tailored for creators and commissioners. Our solution empowers creators and clients to communicate efficiently and collaborate seamlessly within the same ecosystem.

## MVP (Minimum Viable Product)

Our MVP will include essential features for the initial public deployment:

### Commission System
The heart of InkTail's functionality is its robust commission system, powered by a PostgreSQL database integrated with Supabase. Users can easily initiate commission requests, which are assigned unique IDs for tracking. Once a commission is created, it can be submitted to registered creators on the platform. Artists can then accept or reject commissions directly through InkTail, streamlining the entire process.

## Safe Paws (Escrow System) 
Safe Paws is InkTails optional Escrow System. It will allow users to set up milestone payments when a certian condition is met with the commissioning piece of work. This allows a layer of financial safety and transparency for both users involved in a transaction. It serves 3 purposes

- Allows deposits to be handled by logic and stored securly in an escrow account where both parties can see the balance.
- Enables milestone commission system where an artist can get paid as soon as a milestone has been met. 


The create commission endpoint is: /api/commission/create

Here is what the structure looks like:
```json
{
	"commissionData": [
		{
			"id": 70,
			"created_at": "2024-04-22T19:50:31.708+00:00",
			"is_mature": false,
			"media_storage": null,
			"price": null,
			"description": "",
			"media_type": "digital_art",
			"title": "Custom Digital Artwork",
			"status": "Requested",
			"commissioner_id": "3ffc7f25-0897-47c0-bfb5-9d1fc103e58d",
			"creator_id": null
		}
	],
	"error": null
}

```


### Creator Profiles
InkTail focuses on creators. So the Creator Profiles should be elegently designed and easy to navigate. For the MVP we will only be looking to have these features and options:

- Commission Status Indicator: Allow creator to set a public status on commission availability. Commission Closed | Commissions Open
- Profile picture: Basic upload of a PFP.
- Portfolio: Allow creator to link or showcase previous work.
- About Section: Allows the creator to enter in information about themselves.
    - Third party link: Twitter, Twitch, Website, etc

### Payment Rails
InkTail will allow creators to set prices and accept payment for their work. This feature should be precisely engineered to allow for payments, refunds. Some payment providers we will consider:

Only 1 of these integrations is needed for MVP.

- Stripe
- Plaid
- Paypal

## Getting Started

### Stack

- Next.js
- Yarn
- React
- Tailwind
- Supabase
- Payment rail (NYI)

First, install dependencies:

```bash
yarn install
```
Then run the development server locally:
```bash
yarn run dev
```

