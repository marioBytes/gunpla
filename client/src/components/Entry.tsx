import { useState } from 'react';

const ModelViewPage = () => {
  // Sample model data - in a real app this would come from props or API
  const [model, setModel] = useState({
    id: 1,
    name: 'RG 1/144 Nu Gundam',
    status: 'completed',
    grade: 'Real Grade',
    series: 'Mobile Suit Gundam: Char\'s Counterattack',
    images: [] // Empty array to show no images state
    // images: [
    //   'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    //   'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop',
    //   'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop'
    // ]
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({ ...model });

  const statusOptions = [
    { value: 'backlog', label: 'Backlog' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const gradeOptions = [
    'High Grade',
    'Real Grade', 
    'Master Grade',
    'Perfect Grade',
    'Mega Size'
  ];

  const handleSave = () => {
    setModel({ ...editData });
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditData({ ...model });
    setIsEditMode(false);
  };

  const nextImage = () => {
    if (model.images && model.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % model.images.length);
    }
  };

  const prevImage = () => {
    if (model.images && model.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + model.images.length) % model.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Carousel */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-700 relative">
                {model.images && model.images.length > 0 ? (
                  <>
                    <img
                      src={model.images[currentImageIndex]}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation arrows */}
                    {model.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Image counter */}
                    {model.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {model.images.length}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <Camera className="w-16 h-16 mb-4" />
                    <span className="text-lg font-medium mb-2">No images uploaded</span>
                    <p className="text-sm text-center max-w-xs">
                      Upload some photos of your Gunpla model to showcase your build!
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Upload Images
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Image thumbnails */}
            {model.images && model.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {model.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      currentImageIndex === index 
                        ? 'border-blue-400' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <img src={image} alt={`${model.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Model Information */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Model Name
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Enter model name"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-white">{model.name}</h1>
                )}
              </div>

              {/* Grade */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Grade
                </label>
                {isEditMode ? (
                  <select
                    value={editData.grade}
                    onChange={(e) => setEditData({ ...editData, grade: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="">Select Grade</option>
                    {gradeOptions.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg text-white">{model.grade || 'Not specified'}</p>
                )}
              </div>

              {/* Series */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Series
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.series}
                    onChange={(e) => setEditData({ ...editData, series: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="e.g., Mobile Suit Gundam"
                  />
                ) : (
                  <p className="text-lg text-white">{model.series || 'Not specified'}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Status
                </label>
                {isEditMode ? (
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      model.status === 'completed' ? 'bg-green-400' :
                      model.status === 'in-progress' ? 'bg-yellow-400' :
                      model.status === 'on-hold' ? 'bg-orange-400' : 'bg-blue-400'
                    }`} />
                    <span className="text-white capitalize">
                      {statusOptions.find(opt => opt.value === model.status)?.label || model.status}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Edit/Save buttons at bottom */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              {isEditMode ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Cancel Changes
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                  Edit Model Information
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelViewPage;