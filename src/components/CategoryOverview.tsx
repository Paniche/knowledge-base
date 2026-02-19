import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { CategoryInfo } from '../types';
import { KnowledgeItem } from '../types';
import { getIcon } from '../utils/icons';

interface CategoryOverviewProps {
  categories: CategoryInfo[];
  items: KnowledgeItem[];
}

const CategoryOverview: React.FC<CategoryOverviewProps> = ({ categories, items }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        欢迎来到知识库
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        探索产品开发与技术开发的核心知识，从理论到实践，从成功案例到教训总结
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {categories.map((category) => {
          const Icon = getIcon(category.icon);
          const count = items.filter(item => item.category === category.id).length;
          
          return (
            <Card
              key={category.id}
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '2px solid transparent',
                '&:hover': {
                  borderColor: category.color,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    bgcolor: category.color + '15',
                    color: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Icon size={28} />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {category.name}
                </Typography>
                
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {category.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: category.color }}
                  >
                    {count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    项内容
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box sx={{ mt: 6, p: 4, bgcolor: 'primary.main', borderRadius: 4, color: 'white' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              开始构建您的知识库
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              知识库是团队智慧的沉淀。通过系统化的知识管理，
              让经验得以传承，让创新有据可依。立即开始整理您的知识资产。
            </Typography>
          </Box>
          <Box sx={{ textAlign: { md: 'right' } }}>
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: 2,
                textAlign: 'center',
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {items.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  知识条目
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {categories.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  知识分类
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryOverview;
