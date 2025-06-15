#!/bin/bash

# Script to update all AI tool components to remove API key setup requirements
# Since we've hardcoded the API key in the GeminiService

echo "🚀 Updating AI tools to remove API key setup requirements..."

# List of AI tool component files to update
COMPONENTS=(
    "src/components/SocialMediaCaption.tsx"
    "src/components/AdCopyGenerator.tsx" 
    "src/components/SEOMetaGenerator.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo "📝 Processing $component..."
        
        # Create a backup
        cp "$component" "${component}.backup"
        
        # Remove API key related imports and states using sed
        sed -i '' '
            s/, useEffect//g
            s/, Settings//g
            s/, AlertCircle//g
            s/import ApiKeyModal.*;//g
            s/const \[showApiKeyModal.*//g
            s/const \[isApiKeyConfigured.*//g
            s/useEffect(() => {.*}), \[\]);?//g
            s/setIsApiKeyConfigured.*//g
            s/!geminiService\.isConfigured())/false)/g
            s/setShowApiKeyModal.*//g
            s/handleApiKeySet.*//g
            s/showApiKeySetup={.*}//g
            s/onApiKeySetup={.*}//g
        ' "$component"
        
        echo "✅ Updated $component"
    else
        echo "⚠️  $component not found, skipping..."
    fi
done

echo "🎉 AI tools update completed!"
echo ""
echo "📋 Summary of changes:"
echo "• Removed API key setup modal imports and state"
echo "• Removed API key configuration checks"  
echo "• Removed API key setup UI elements"
echo "• All AI tools now work automatically with the hardcoded API key"
echo ""
echo "🔑 API Key: AIzaSyD_RTZuh-ygB1FbOuu14i5LQcz-8w3MmRY"
echo "📡 Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
