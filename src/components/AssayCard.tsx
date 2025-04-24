
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface AssayCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  cellType: string;
  imagingType: string;
  thumbnail: string;
}

const AssayCard: React.FC<AssayCardProps> = ({
  id,
  title,
  description,
  category,
  cellType,
  imagingType,
  thumbnail
}) => {
  return (
    <Link to={`/assay/${id}`} className="block">
      <Card className="scientific-card h-full flex flex-col hover:border-science-teal/50">
        <CardHeader className="p-0">
          <div className="w-full h-40 rounded-t-lg overflow-hidden">
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-4 flex-grow">
          <CardTitle className="text-lg font-semibold text-science-blue mb-2 line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm mb-4">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-science-light-purple/10 text-science-purple border-science-light-purple/30">
              {category}
            </Badge>
            <Badge variant="outline" className="bg-science-light-teal/10 text-science-teal border-science-light-teal/30">
              {cellType}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-6">
          <div className="w-full flex items-center justify-between">
            <Badge variant="secondary" className="bg-science-teal text-white">
              {imagingType}
            </Badge>
            <span className="text-sm font-medium text-primary">View Details →</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AssayCard;
