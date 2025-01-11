import React from 'react'
import { Quote } from 'lucide-react'

interface CardProps {
	name: string
	position: string
	photo: string
	motto: string
}

const Card: React.FC<CardProps> = ({ name, position, photo, motto }) => {
	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
			{/* Photo */}
			<div className="relative h-48 overflow-hidden bg-green-100">
				<img src={photo} alt={name} className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-green-600/70 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-3 text-white">
					<h3 className="font-bold text-lg leading-tight">{name}</h3>
					<p className="text-sm opacity-90">{position}</p>
				</div>
			</div>

			{/* Motto */}
			<div className="p-4">
				<div className="flex items-start gap-2">
					<Quote className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
					<p className="text-sm text-gray-600 italic">"{motto}"</p>
				</div>
			</div>

			{/* Subtle decorative element */}
			<div className="h-1 bg-gradient-to-r from-green-400 to-green-600" />
		</div>
	)
}

export default Card
