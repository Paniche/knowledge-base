import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Eye,
  Star,
  Clock,
  FileText,
  FileArchive,
  Video,
  Image as ImageIcon,
  FileCode,
  MoreVertical,
} from 'lucide-react';
import { KnowledgeItem } from '../types';
import { categories } from '../data/categories';

interface KnowledgeCardProps {
  item: KnowledgeItem;
  viewMode: 'grid' | 'list';
  onClick?: () => void;
}

const getFileIcon = (fileType?: string) => {
  switch (fileType?.toLowerCase()) {
    case 'pdf':
      return <FileText size={20} />;
    case 'docx':
    case 'doc':
      return <FileText size={20} />;
    case 'mp4':
    case 'avi':
    case 'mov':
      return <Video size={20} />;
    case 'jpg':
    case 'png':
    case 'gif':
      return <ImageIcon size={20} />;
    case 'zip':
    case 'rar':
    case '7z':
      return <FileArchive size={20} />;
    case 'js':
    case 'ts':
    case 'html':
    case 'css':
      return <FileCode size={20} />;
    default:
      return <FileText size={20} />;
  }
};

const isImageUrl = (thumbnail?: string) => {
  if (!thumbnail) return false;
  return /^(https?:\/\/|\/).+\.(png|jpe?g|gif|webp|svg)$/i.test(thumbnail);
};

const buildThumbnail = (
  item: KnowledgeItem,
  categoryColor?: string,
  options?: { compact?: boolean }
) => {
  if (isImageUrl(item.thumbnail)) {
    return (
      <Box
        component="img"
        src={item.thumbnail}
        alt={item.title}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  const baseColor = categoryColor || '#64748B';
  const compact = Boolean(options?.compact);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        px: compact ? 1 : 2,
        py: compact ? 1 : 1.5,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(baseColor, 0.22)} 0%, ${alpha(baseColor, 0.06)} 100%)`,
        border: '1px solid',
        borderColor: alpha(baseColor, 0.2),
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: compact ? '50%' : -8,
          bottom: compact ? '50%' : -12,
          color: alpha(baseColor, compact ? 0.78 : 0.22),
          transform: compact
            ? 'translate(50%, 50%) scale(1.1)'
            : 'scale(2.3)',
          transformOrigin: 'bottom right',
        }}
      >
        {getFileIcon(item.fileType)}
      </Box>

      {!compact && (
        <>
          <Typography
            variant="caption"
            sx={{
              display: 'inline-block',
              px: 1,
              py: 0.3,
              borderRadius: 1,
              bgcolor: alpha(baseColor, 0.18),
              color: baseColor,
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            {(item.fileType || 'DOC').toUpperCase()}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              mt: 1.5,
              fontWeight: 700,
              lineHeight: 1.35,
              maxWidth: '80%',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.title}
          </Typography>
        </>
      )}
    </Box>
  );
};

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ item, viewMode, onClick }) => {
  const theme = useTheme();
  const category = categories.find(c => c.id === item.category);

  if (viewMode === 'list') {
    return (
      <Card
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: 'grey.100',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {buildThumbnail(item, category?.color, { compact: true })}
        </Box>

        <Box sx={{ flex: 1, ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {item.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <Chip
              label={category?.name}
              size="small"
              sx={{
                bgcolor: category?.color + '15',
                color: category?.color,
                fontWeight: 500,
                height: 24,
              }}
            />
            {item.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ height: 24 }}
              />
            ))}
            {item.tags.length > 3 && (
              <Typography variant="caption" color="text.secondary">
                +{item.tags.length - 3}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <Eye size={16} />
              <Typography variant="caption">{item.views}</Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'warning.main' }}>
              <Star size={16} fill="currentColor" />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {item.rating}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right', minWidth: 80 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              {item.fileType}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.fileSize}
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <MoreVertical size={18} />
          </IconButton>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: 140,
          bgcolor: 'grey.50',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {buildThumbnail(item, category?.color)}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 0.5,
          }}
        >
          <Chip
            label={item.fileType}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              height: 24,
              fontSize: '0.75rem',
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label={category?.name}
            size="small"
            sx={{
              bgcolor: category?.color + '15',
              color: category?.color,
              fontWeight: 500,
              height: 24,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1.0625rem', lineHeight: 1.4 }}>
          {item.title}
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
          {item.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
          {item.tags.slice(0, 4).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                height: 24,
                fontSize: '0.75rem',
                borderRadius: 1,
              }}
            />
          ))}
          {item.tags.length > 4 && (
            <Chip
              label={`+${item.tags.length - 4}`}
              size="small"
              variant="outlined"
              sx={{ height: 24, fontSize: '0.75rem' }}
            />
          )}
        </Box>

        <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="浏览次数">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                  <Eye size={16} />
                  <Typography variant="caption">{item.views}</Typography>
                </Box>
              </Tooltip>
              
              <Tooltip title="评分">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'warning.main' }}>
                  <Star size={16} fill="currentColor" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {item.rating}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <Clock size={14} />
              <Typography variant="caption">
                {new Date(item.updatedAt).toLocaleDateString('zh-CN')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default KnowledgeCard;
