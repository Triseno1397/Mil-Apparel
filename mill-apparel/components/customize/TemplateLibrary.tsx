'use client';

import { useCustomizer } from '@/context/CustomizerContext';
import { DesignTemplate, MilitaryGraphic } from '@/types/customizer';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Grid3x3, LayoutTemplate } from 'lucide-react';

// Professional military graphics library - 21 graphics organized by category
const MILITARY_GRAPHICS: MilitaryGraphic[] = [
    // Branch Emblems
    {
        id: 'army-eagle',
        name: 'US Army Eagle',
        category: 'emblem',
        branch: 'army',
        imageUrl: '/images/graphics/army_eagle_emblem_1768070137267.png',
        tags: ['army', 'eagle', 'emblem', 'United States Army'],
    },
    {
        id: 'navy-anchor',
        name: 'USN Anchor',
        category: 'emblem',
        branch: 'navy',
        imageUrl: '/images/graphics/navy_anchor_emblem_1768070152449.png',
        tags: ['navy', 'anchor', 'usn', 'naval'],
    },
    {
        id: 'usmc-ega',
        name: 'USMC Eagle Globe Anchor',
        category: 'emblem',
        branch: 'marines',
        imageUrl: '/images/graphics/usmc_ega_emblem_1768070166915.png',
        tags: ['marines', 'ega', 'eagle', 'globe', 'anchor', 'usmc'],
    },
    {
        id: 'air-force-wings',
        name: 'US Air Force Wings',
        category: 'emblem',
        branch: 'air-force',
        imageUrl: '/images/graphics/air_force_wings_1768070181072.png',
        tags: ['air force', 'wings', 'usaf', 'aviation'],
    },
    {
        id: 'coast-guard-shield',
        name: 'USCG Shield',
        category: 'emblem',
        branch: 'coast-guard',
        imageUrl: '/images/graphics/coast_guard_shield_1768070195248.png',
        tags: ['coast guard', 'shield', 'uscg', 'maritime'],
    },

    // Unit Patches
    {
        id: '82nd-airborne',
        name: '82nd Airborne Division',
        category: 'patch',
        branch: 'army',
        imageUrl: '/images/graphics/82nd_airborne_patch_1768070216913.png',
        tags: ['82nd', 'airborne', 'all american', 'aa', 'army'],
    },
    {
        id: '101st-airborne',
        name: '101st Airborne Division',
        category: 'patch',
        branch: 'army',
        imageUrl: '/images/graphics/101st_airborne_patch_1768070230615.png',
        tags: ['101st', 'screaming eagles', 'airborne', 'army'],
    },
    {
        id: 'big-red-one',
        name: '1st Infantry Division',
        category: 'patch',
        branch: 'army',
        imageUrl: '/images/graphics/big_red_one_patch_1768070244191.png',
        tags: ['1st infantry', 'big red one', 'army'],
    },

    // Qualification Tabs & Badges
    {
        id: 'ranger-tab',
        name: 'Ranger Tab',
        category: 'patch',
        branch: 'army',
        imageUrl: '/images/graphics/ranger_tab_1768070257709.png',
        tags: ['ranger', 'army', 'tab', 'qualification'],
    },
    {
        id: 'airborne-tab',
        name: 'Airborne Tab',
        category: 'patch',
        branch: 'army',
        imageUrl: '/images/graphics/airborne_tab_1768070270452.png',
        tags: ['airborne', 'army', 'tab', 'jump'],
    },
    {
        id: 'sf-tab',
        name: 'Special Forces Tab',
        category: 'patch',
        branch: 'army',
        imageUrl: '/images/graphics/special_forces_tab_1768070285063.png',
        tags: ['special forces', 'green beret', 'army', 'tab'],
    },
    {
        id: 'navy-seal-trident',
        name: 'Navy SEAL Trident',
        category: 'badge',
        branch: 'navy',
        imageUrl: '/images/graphics/navy_seal_trident_1768070313904.png',
        tags: ['seal', 'trident', 'navy', 'special warfare'],
    },
    {
        id: 'jump-wings',
        name: 'Parachutist Wings',
        category: 'badge',
        branch: 'army',
        imageUrl: '/images/graphics/jump_wings_badge_1768070327207.png',
        tags: ['airborne', 'jump wings', 'parachutist', 'qualification'],
    },
    {
        id: 'pilot-wings',
        name: 'Aviator Wings',
        category: 'badge',
        branch: 'air-force',
        imageUrl: '/images/graphics/pilot_wings_badge_1768070340931.png',
        tags: ['pilot', 'aviator', 'wings', 'aviation'],
    },

    // Decorative Elements
    {
        id: 'american-flag',
        name: 'American Flag',
        category: 'icon',
        imageUrl: '/images/graphics/american_flag_graphic_1768070354168.png',
        tags: ['flag', 'usa', 'america', 'patriotic'],
    },
    {
        id: 'eagle-silhouette',
        name: 'Eagle Silhouette',
        category: 'icon',
        imageUrl: '/images/graphics/eagle_silhouette_1768070368400.png',
        tags: ['eagle', 'patriot', 'bird', 'america'],
    },
    {
        id: 'military-stars',
        name: 'Military Stars',
        category: 'icon',
        imageUrl: '/images/graphics/military_stars_1768070381831.png',
        tags: ['stars', 'rank', 'decoration'],
    },
    {
        id: 'dog-tags',
        name: 'Dog Tags',
        category: 'icon',
        imageUrl: '/images/graphics/dog_tags_graphic_1768070404592.png',
        tags: ['dog tags', 'identification', 'military', 'soldier'],
    },
    {
        id: 'compass-rose',
        name: 'Tactical Compass',
        category: 'icon',
        imageUrl: '/images/graphics/compass_rose_graphic_1768070419369.png',
        tags: ['compass', 'navigation', 'tactical'],
    },
    {
        id: 'shield',
        name: 'Military Shield',
        category: 'icon',
        imageUrl: '/images/graphics/shield_emblem_1768070432967.png',
        tags: ['shield', 'protection', 'heraldry'],
    },
    {
        id: 'crossed-rifles',
        name: 'Crossed Rifles',
        category: 'insignia',
        imageUrl: '/images/graphics/crossed_rifles_1768070446922.png',
        tags: ['infantry', 'rifles', 'crossed', 'weapons'],
    },
];

// Professional military design templates with complete layer configurations
const DESIGN_TEMPLATES: DesignTemplate[] = [
    {
        id: 'unit-pride-army',
        name: 'Unit Pride - Army',
        category: 'military',
        branch: 'army',
        previewUrl: '/images/graphics/army_eagle_emblem_1768070137267.png',
        layers: [
            {
                type: 'graphic',
                imageUrl: '/images/graphics/army_eagle_emblem_1768070137267.png',
                imageName: 'US Army Eagle',
                position: { x: 225, y: 150 },
                size: { width: 150, height: 150 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'text',
                text: 'UNITED STATES ARMY',
                fontFamily: 'Arial Black',
                fontSize: 32,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                position: { x: 175, y: 350 },
                size: { width: 250, height: 50 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
        ],
    },
    {
        id: 'special-operations',
        name: 'Special Operations',
        category: 'military',
        branch: 'army',
        previewUrl: '/images/graphics/special_forces_tab_1768070285063.png',
        layers: [
            {
                type: 'graphic',
                imageUrl: '/images/graphics/special_forces_tab_1768070285063.png',
                imageName: 'Special Forces Tab',
                position: { x: 200, y: 150 },
                size: { width: 200, height: 60 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'graphic',
                imageUrl: '/images/graphics/airborne_tab_1768070270452.png',
                imageName: 'Airborne Tab',
                position: { x: 200, y: 230 },
                size: { width: 200, height: 60 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'graphic',
                imageUrl: '/images/graphics/jump_wings_badge_1768070327207.png',
                imageName: 'Jump Wings',
                position: { x: 200, y: 320 },
                size: { width: 200, height: 80 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
        ],
    },
    {
        id: 'veteran-service',
        name: 'Veteran Service',
        category: 'memorial',
        previewUrl: '/images/graphics/american_flag_graphic_1768070354168.png',
        layers: [
            {
                type: 'graphic',
                imageUrl: '/images/graphics/american_flag_graphic_1768070354168.png',
                imageName: 'American Flag',
                position: { x: 175, y: 150 },
                size: { width: 250, height: 150 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 0.8,
            },
            {
                type: 'text',
                text: 'VETERAN',
                fontFamily: 'Arial Black',
                fontSize: 48,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                position: { x: 200, y: 350 },
                size: { width: 200, height: 60 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'text',
                text: '2001 - 2021',
                fontFamily: 'Arial',
                fontSize: 24,
                fontWeight: 'normal',
                color: '#333333',
                textAlign: 'center',
                position: { x: 200, y: 420 },
                size: { width: 200, height: 40 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
        ],
    },
    {
        id: 'infantry-pride',
        name: 'Infantry Pride',
        category: 'military',
        branch: 'army',
        previewUrl: '/images/graphics/crossed_rifles_1768070446922.png',
        layers: [
            {
                type: 'graphic',
                imageUrl: '/images/graphics/crossed_rifles_1768070446922.png',
                imageName: 'Crossed Rifles',
                position: { x: 225, y: 180 },
                size: { width: 150, height: 150 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'text',
                text: 'INFANTRY',
                fontFamily: 'Arial Black',
                fontSize: 40,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                position: { x: 200, y: 360 },
                size: { width: 200, height: 50 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
        ],
    },
    {
        id: 'naval-excellence',
        name: 'Naval Excellence',
        category: 'military',
        branch: 'navy',
        previewUrl: '/images/graphics/navy_seal_trident_1768070313904.png',
        layers: [
            {
                type: 'graphic',
                imageUrl: '/images/graphics/navy_seal_trident_1768070313904.png',
                imageName: 'Navy SEAL Trident',
                position: { x: 175, y: 180 },
                size: { width: 250, height: 120 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'text',
                text: 'THE ONLY EASY DAY',
                fontFamily: 'Arial Black',
                fontSize: 28,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                position: { x: 150, y: 340 },
                size: { width: 300, height: 40 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'text',
                text: 'WAS YESTERDAY',
                fontFamily: 'Arial Black',
                fontSize: 28,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                position: { x: 150, y: 380 },
                size: { width: 300, height: 40 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
        ],
    },
    {
        id: 'airborne-legacy',
        name: 'Airborne Legacy',
        category: 'military',
        branch: 'army',
        previewUrl: '/images/graphics/101st_airborne_patch_1768070230615.png',
        layers: [
            {
                type: 'graphic',
                imageUrl: '/images/graphics/101st_airborne_patch_1768070230615.png',
                imageName: '101st Airborne',
                position: { x: 200, y: 150 },
                size: { width: 200, height: 200 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
            {
                type: 'text',
                text: 'SCREAMING EAGLES',
                fontFamily: 'Arial Black',
                fontSize: 32,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
                position: { x: 150, y: 380 },
                size: { width: 300, height: 45 },
                rotation: 0,
                locked: false,
                visible: true,
                opacity: 1,
            },
        ],
    },
];

export default function TemplateLibrary() {
    const { addLayer } = useCustomizer();
    const [activeTab, setActiveTab] = useState<'templates' | 'graphics'>('graphics');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredGraphics = MILITARY_GRAPHICS.filter(graphic => {
        const matchesSearch = graphic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            graphic.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || graphic.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddGraphic = (graphic: MilitaryGraphic) => {
        addLayer({
            type: 'graphic',
            imageUrl: graphic.imageUrl,
            imageName: graphic.name,
            position: { x: 250, y: 300 },
            size: { width: 100, height: 100 },
            rotation: 0,
            locked: false,
            visible: true,
            opacity: 1,
        });
    };

    const handleApplyTemplate = (template: DesignTemplate) => {
        template.layers.forEach(layerData => {
            addLayer(layerData);
        });
    };

    return (
        <div className="w-full md:w-80 bg-[#1a1a1a] md:border-r border-gray-800 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('graphics')}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'graphics'
                            ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <Grid3x3 className="h-4 w-4 inline mr-2" />
                        Graphics
                    </button>
                    <button
                        onClick={() => setActiveTab('templates')}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'templates'
                            ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <LayoutTemplate className="h-4 w-4 inline mr-2" />
                        Templates
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none text-sm"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'graphics' ? (
                    <>
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {['all', 'insignia', 'patch', 'badge', 'emblem', 'icon'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${selectedCategory === cat
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Graphics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {filteredGraphics.map(graphic => (
                                <button
                                    key={graphic.id}
                                    onClick={() => handleAddGraphic(graphic)}
                                    className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-800 hover:border-orange-500 transition-all group"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center p-3">
                                        <Image
                                            src={graphic.imageUrl}
                                            alt={graphic.name}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                            quality={75}
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                                        <p className="text-xs text-white font-semibold truncate">{graphic.name}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all" />
                                </button>
                            ))}
                        </div>

                        {filteredGraphics.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No graphics found</p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* Templates Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {DESIGN_TEMPLATES.map(template => (
                                <button
                                    key={template.id}
                                    onClick={() => handleApplyTemplate(template)}
                                    className="relative aspect-[4/3] bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-800 hover:border-orange-500 transition-all group"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <Image
                                            src={template.previewUrl}
                                            alt={template.name}
                                            width={200}
                                            height={150}
                                            className="w-full h-full object-contain opacity-80"
                                            loading="lazy"
                                            quality={75}
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                                        <p className="text-sm text-white font-bold">{template.name}</p>
                                        <p className="text-xs text-gray-400 capitalize">{template.category}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all" />
                                </button>
                            ))}
                        </div>

                        {DESIGN_TEMPLATES.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No templates available</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
