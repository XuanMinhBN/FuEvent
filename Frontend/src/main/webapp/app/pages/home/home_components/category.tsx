import React, { Dispatch, SetStateAction } from 'react';
import { Book, Music, Wrench, Users, Trophy, Briefcase, Gift, Cpu, MoreHorizontal, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from 'app/shared/components/button';
import { Translate } from 'react-jhipster';
import './category.scss';

interface ICategory {
  name: string;
  icon?: LucideIcon;
  color: string;
  count: number;
}

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export const Categories: React.FC<CategoriesProps> = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();

  const categories: ICategory[] = [
    { name: 'All', color: '#FF6B35', count: 48 },
    { name: 'Academic', icon: Book, color: '#4F46E5', count: 12 },
    { name: 'Music', icon: Music, color: '#EC4899', count: 8 },
    { name: 'Workshop', icon: Wrench, color: '#10B981', count: 15 },
    { name: 'Club', icon: Users, color: '#F59E0B', count: 7 },
    { name: 'Sports', icon: Trophy, color: '#EF4444', count: 6 },
    { name: 'Career', icon: Briefcase, color: '#10B981', count: 8 },
    { name: 'Festival', icon: Gift, color: '#F59E0B', count: 5 },
    { name: 'Technology', icon: Cpu, color: '#3B82F6', count: 20 },
    { name: 'Other', icon: MoreHorizontal, color: '#6B7280', count: 3 },
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate('/events', { state: { category: categoryName } });
  };

  return (
    <section className="categories section">
      <div className="container">
        <h2 className="section-title">
          <Translate contentKey="global.section.title">Explore Events</Translate>
        </h2>
        <div className="categories-grid">
          {categories.map(category => (
            <CustomButton
              key={category.name}
              className="category-card"
              name={category.name}
              contentKey={category.name}
              icon={category.icon}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => handleCategoryClick(category.name)}
              style={
                {
                  '--category-color': category.color,
                  borderColor: selectedCategory === category.name ? category.color : undefined,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
